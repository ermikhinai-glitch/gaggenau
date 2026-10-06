type Locale = 'ru' | 'en';

type LeadCopy = {
  title: string;
  noticeDay: string;
  noticeNight: string;
  thankyouDay: string;
  thankyouNight: string;
  errorName: string;
  errorPhone: string;
  errorConsent: string;
  errorGeneric: string;
  errorNetwork: string;
  submitting: string;
  submit: string;
};

type Prefill = { slug?: string; label?: string };

declare global {
  interface Window {
    __leadAppliancePrefill?: Prefill;
    __openLeadModal?: (prefill?: Prefill) => void;
  }
}

function isBusinessHoursMoscow(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  return hour >= 8 && hour < 22;
}

/** Digits only, RU mobile normalized to 11 digits starting with 7 */
function extractRuPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`;
  if (digits.length === 10 && digits.startsWith('9')) digits = `7${digits}`;
  if (!digits.startsWith('7')) digits = `7${digits}`;
  return digits.slice(0, 11);
}

/** Live mask: +7 (XXX) XXX-XX-XX */
function formatRuPhone(value: string): string {
  const digits = extractRuPhoneDigits(value);
  if (!digits) return '';
  const rest = digits.slice(1);
  let out = '+7';
  if (!rest.length) return out;
  out += ` (${rest.slice(0, 3)}`;
  if (rest.length < 3) return out;
  out += ')';
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

function normalizePhone(value: string): string {
  const digits = extractRuPhoneDigits(value);
  return digits ? `+${digits}` : '';
}

function isPhoneValid(value: string): boolean {
  const digits = extractRuPhoneDigits(value);
  return digits.length === 11 && digits.startsWith('7');
}

export function initLeadModal(root: HTMLElement): void {
  const locale = (root.dataset.locale as Locale) || 'ru';
  const copy = JSON.parse(root.dataset.copy || '{}') as LeadCopy;
  const privacyHref = root.dataset.privacyHref || '#';
  const apiUrl = root.dataset.apiUrl || '/api/lead.php';

  const dialog = root.querySelector<HTMLElement>('[data-lead-dialog]');
  const formView = root.querySelector<HTMLElement>('[data-lead-form-view]');
  const successView = root.querySelector<HTMLElement>('[data-lead-success-view]');
  const form = root.querySelector<HTMLFormElement>('[data-lead-form]');
  const noticeEl = root.querySelector<HTMLElement>('[data-lead-notice]');
  const successText = root.querySelector<HTMLElement>('[data-lead-success-text]');
  const applianceSelect = root.querySelector<HTMLSelectElement>('[data-lead-appliance]');
  const citySelect = root.querySelector<HTMLSelectElement>('[data-lead-city]');
  const timeSelect = root.querySelector<HTMLSelectElement>('[data-lead-time]');
  const optionalBlock = root.querySelector<HTMLDetailsElement>('[data-lead-optional]');
  const errorBox = root.querySelector<HTMLElement>('[data-lead-errors]');
  const submitBtn = root.querySelector<HTMLButtonElement>('[data-lead-submit]');
  const privacyLink = root.querySelector<HTMLAnchorElement>('[data-lead-privacy-link]');
  const phoneInput = root.querySelector<HTMLInputElement>('[data-lead-phone]');
  const nameInput = root.querySelector<HTMLInputElement>('[data-lead-name]');
  const consentInput = root.querySelector<HTMLInputElement>('[data-lead-consent]');

  function syncSelectStyle(select: HTMLSelectElement | null): void {
    if (!select) return;
    if (select.value) {
      select.classList.remove('lux-select--empty');
    } else {
      select.classList.add('lux-select--empty');
    }
  }

  function syncOptionalSelectStyles(): void {
    syncSelectStyle(applianceSelect);
    syncSelectStyle(citySelect);
    syncSelectStyle(timeSelect);
  }

  if (!dialog || !formView || !successView || !form || !submitBtn) return;

  if (privacyLink) privacyLink.href = privacyHref;

  let lastFocus: HTMLElement | null = null;
  let open = false;

  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function updateNotice(): void {
    const day = isBusinessHoursMoscow();
    if (noticeEl) noticeEl.textContent = day ? copy.noticeDay : copy.noticeNight;
  }

  function setFieldInvalid(el: HTMLElement | null, invalid: boolean): void {
    if (!el) return;
    el.classList.toggle('is-invalid', invalid);
    el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
  }

  function clearFieldErrors(): void {
    setFieldInvalid(nameInput, false);
    setFieldInvalid(phoneInput, false);
    setFieldInvalid(consentInput, false);
  }

  function setErrors(messages: string[]): void {
    if (!errorBox) return;
    if (!messages.length) {
      errorBox.classList.add('hidden');
      errorBox.textContent = '';
      return;
    }
    errorBox.classList.remove('hidden');
    errorBox.textContent = messages.join(' · ');
  }

  function restorePhonePlaceholder(): void {
    if (!phoneInput) return;
    const ph =
      phoneInput.dataset.placeholder ||
      phoneInput.getAttribute('placeholder') ||
      '+7 (___) ___-__-__';
    phoneInput.dataset.placeholder = ph;
    if (!phoneInput.value.trim()) {
      phoneInput.setAttribute('placeholder', ph);
    }
  }

  function clearIdentityFields(): void {
    if (nameInput) nameInput.value = '';
    if (phoneInput) {
      phoneInput.value = '';
      phoneInput.setAttribute('readonly', 'readonly');
      restorePhonePlaceholder();
    }
  }

  function showForm(): void {
    formView.classList.remove('hidden');
    successView.classList.add('hidden');
    form.reset();
    clearIdentityFields();
    // Browser may refill after reset — clear again on next ticks
    requestAnimationFrame(clearIdentityFields);
    window.setTimeout(clearIdentityFields, 50);
    window.setTimeout(clearIdentityFields, 200);
    if (optionalBlock) optionalBlock.open = false;
    syncOptionalSelectStyles();
    clearFieldErrors();
    setErrors([]);
    submitBtn.disabled = false;
    submitBtn.textContent = copy.submit;
  }

  function capitalizeName(value: string): string {
    return value
      .split(/(\s+|-)/)
      .map((part) => {
        if (!part || /^\s+$/.test(part) || part === '-') return part;
        return part.charAt(0).toLocaleUpperCase(locale === 'ru' ? 'ru-RU' : 'en-US') + part.slice(1);
      })
      .join('');
  }

  function bindPlaceholderHide(input: HTMLInputElement | null): void {
    if (!input) return;
    const placeholder = input.getAttribute('placeholder') || '';
    if (!placeholder) return;
    input.dataset.placeholder = placeholder;
    input.addEventListener('focus', () => {
      input.setAttribute('placeholder', '');
    });
    // Defer: phone mask may clear "+7 (" on the same blur tick
    input.addEventListener('blur', () => {
      requestAnimationFrame(() => {
        if (!input.value.trim()) {
          input.setAttribute('placeholder', input.dataset.placeholder || placeholder);
        }
      });
    });
  }

  function bindNameCapitalize(): void {
    if (!nameInput) return;
    nameInput.addEventListener('input', () => {
      const start = nameInput.selectionStart;
      const end = nameInput.selectionEnd;
      const next = capitalizeName(nameInput.value);
      if (next === nameInput.value) return;
      nameInput.value = next;
      if (start != null && end != null) {
        nameInput.setSelectionRange(start, end);
      }
    });
    nameInput.addEventListener('blur', () => {
      nameInput.value = capitalizeName(nameInput.value.trim());
    });
  }

  bindNameCapitalize();
  bindPlaceholderHide(nameInput);
  // Phone: keep placeholder attribute always (mask value hides it on focus)

  nameInput?.addEventListener('input', () => setFieldInvalid(nameInput, false));
  phoneInput?.addEventListener('input', () => setFieldInvalid(phoneInput, false));
  consentInput?.addEventListener('change', () => {
    if (consentInput.checked) setFieldInvalid(consentInput, false);
  });

  function bindPhoneMask(): void {
    if (!phoneInput) return;

    const initialPh = phoneInput.getAttribute('placeholder') || '+7 (___) ___-__-__';
    phoneInput.dataset.placeholder = initialPh;

    const unlock = () => {
      phoneInput.removeAttribute('readonly');
    };

    phoneInput.addEventListener('focus', () => {
      unlock();
      if (!phoneInput.value.trim()) {
        phoneInput.value = '+7 (';
        const pos = phoneInput.value.length;
        requestAnimationFrame(() => phoneInput.setSelectionRange(pos, pos));
      }
    });

    phoneInput.addEventListener('pointerdown', unlock);
    phoneInput.addEventListener('keydown', unlock);

    phoneInput.addEventListener('input', () => {
      const formatted = formatRuPhone(phoneInput.value);
      phoneInput.value = formatted;
    });

    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value === '+7' || phoneInput.value === '+7 (' || phoneInput.value === '+7 ()') {
        phoneInput.value = '';
      }
      phoneInput.setAttribute('readonly', 'readonly');
      restorePhonePlaceholder();
    });

    phoneInput.addEventListener('paste', (event) => {
      event.preventDefault();
      unlock();
      const text = event.clipboardData?.getData('text') || '';
      phoneInput.value = formatRuPhone(text);
    });
  }

  bindPhoneMask();
  optionalBlock?.addEventListener('toggle', () => {
    restorePhonePlaceholder();
  });

  function applyPrefill(prefill?: Prefill): void {
    const data = prefill || window.__leadAppliancePrefill || {};
    if (applianceSelect) {
      const slug = data.slug || '';
      const hasOption = slug
        ? Array.from(applianceSelect.options).some((opt) => opt.value === slug)
        : false;
      applianceSelect.value = hasOption ? slug : '';
      syncOptionalSelectStyles();
    }
    if (optionalBlock && (data.label || data.slug)) {
      optionalBlock.open = true;
    }
  }

  applianceSelect?.addEventListener('change', () => syncSelectStyle(applianceSelect));
  citySelect?.addEventListener('change', () => syncSelectStyle(citySelect));
  timeSelect?.addEventListener('change', () => syncSelectStyle(timeSelect));

  function openModal(prefill?: Prefill): void {
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    showForm();
    applyPrefill(prefill);
    updateNotice();
    root.classList.remove('hidden');
    root.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    open = true;
    nameInput?.focus();
  }

  function closeModal(): void {
    root.classList.add('hidden');
    root.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    open = false;
    lastFocus?.focus();
  }

  function trapFocus(event: KeyboardEvent): void {
    if (!open || event.key !== 'Tab' || !dialog) return;
    const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
    );
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  root.querySelectorAll('[data-lead-close]').forEach((el) => {
    el.addEventListener('click', () => closeModal());
  });

  root.addEventListener('click', (event) => {
    if (event.target === root) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    }
    trapFocus(event);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest('[data-open-lead-modal]');
    if (!btn) return;
    event.preventDefault();
    const slug = btn.getAttribute('data-appliance-prefill') || '';
    const label = btn.getAttribute('data-appliance-label') || '';
    const prefill = { slug, label };
    window.__leadAppliancePrefill = prefill;
    openModal(prefill);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('lead_client_name') || nameInput?.value || '').trim();
    const phone = String(data.get('lead_client_phone') || phoneInput?.value || '').trim();
    const consent = Boolean(consentInput?.checked) || data.get('consent') === 'on';
    const messages: string[] = [];
    const nameOk = Boolean(name);
    const phoneOk = isPhoneValid(phone);
    const consentOk = consent;

    setFieldInvalid(nameInput, !nameOk);
    setFieldInvalid(phoneInput, !phoneOk);
    setFieldInvalid(consentInput, !consentOk);

    if (!nameOk) messages.push(copy.errorName);
    if (!phoneOk) messages.push(copy.errorPhone);
    if (!consentOk) messages.push(copy.errorConsent);
    if (messages.length) {
      setErrors(messages);
      const firstInvalid = !nameOk ? nameInput : !phoneOk ? phoneInput : consentInput;
      firstInvalid?.focus();
      return;
    }

    clearFieldErrors();
    setErrors([]);
    submitBtn.disabled = true;
    submitBtn.textContent = copy.submitting;

    const applianceSlug = String(data.get('applianceSlug') || '');
    const applianceLabel =
      applianceSelect?.selectedOptions[0] && applianceSlug
        ? applianceSelect.selectedOptions[0].text
        : '';

    const payload = {
      locale,
      name,
      phone: normalizePhone(phone),
      consent: true,
      city: String(data.get('city') || '').trim(),
      time: String(data.get('time') || '').trim(),
      applianceSlug,
      applianceLabel,
      problem: String(data.get('problem') || '').trim(),
      channels: data.getAll('channels').map(String),
      company: String(data.get('company') || ''),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      let result: { ok?: boolean; error?: string } | null = null;
      try {
        result = (await response.json()) as { ok?: boolean; error?: string };
      } catch {
        result = null;
      }

      if (!response.ok || !result?.ok) {
        setErrors([copy.errorNetwork]);
        submitBtn.disabled = false;
        submitBtn.textContent = copy.submit;
        return;
      }

      const day = isBusinessHoursMoscow();
      if (successText) successText.textContent = day ? copy.thankyouDay : copy.thankyouNight;
      formView.classList.add('hidden');
      successView.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = copy.submit;

      window.__leadAppliancePrefill = {
        slug: applianceSlug,
        label: applianceLabel,
      };
    } catch {
      setErrors([copy.errorNetwork]);
      submitBtn.disabled = false;
      submitBtn.textContent = copy.submit;
    }
  });

  window.__openLeadModal = openModal;
  updateNotice();
}
