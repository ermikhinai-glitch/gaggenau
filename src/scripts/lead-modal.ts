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

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

function isPhoneValid(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10;
}

export function initLeadModal(root: HTMLElement): void {
  const locale = (root.dataset.locale as Locale) || 'ru';
  const copy = JSON.parse(root.dataset.copy || '{}') as LeadCopy;
  const privacyHref = root.dataset.privacyHref || '#';

  const dialog = root.querySelector<HTMLElement>('[data-lead-dialog]');
  const formView = root.querySelector<HTMLElement>('[data-lead-form-view]');
  const successView = root.querySelector<HTMLElement>('[data-lead-success-view]');
  const form = root.querySelector<HTMLFormElement>('[data-lead-form]');
  const noticeEl = root.querySelector<HTMLElement>('[data-lead-notice]');
  const successText = root.querySelector<HTMLElement>('[data-lead-success-text]');
  const applianceInput = root.querySelector<HTMLInputElement>('[data-lead-appliance]');
  const applianceSlugInput = root.querySelector<HTMLInputElement>('[data-lead-appliance-slug]');
  const errorBox = root.querySelector<HTMLElement>('[data-lead-errors]');
  const submitBtn = root.querySelector<HTMLButtonElement>('[data-lead-submit]');
  const privacyLink = root.querySelector<HTMLAnchorElement>('[data-lead-privacy-link]');

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

  function showForm(): void {
    formView.classList.remove('hidden');
    successView.classList.add('hidden');
    form.reset();
    setErrors([]);
    submitBtn.disabled = false;
    submitBtn.textContent = copy.submit;
  }

  function applyPrefill(prefill?: Prefill): void {
    const data = prefill || window.__leadAppliancePrefill || {};
    if (applianceInput) applianceInput.value = data.label || '';
    if (applianceSlugInput) applianceSlugInput.value = data.slug || '';
  }

  function openModal(prefill?: Prefill): void {
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    showForm();
    applyPrefill(prefill);
    updateNotice();
    root.classList.remove('hidden');
    root.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    open = true;
    const first = form.querySelector<HTMLElement>('input[name="name"]');
    first?.focus();
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
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const consent = data.get('consent') === 'on';
    const messages: string[] = [];

    if (!name) messages.push(copy.errorName);
    if (!isPhoneValid(phone)) messages.push(copy.errorPhone);
    if (!consent) messages.push(copy.errorConsent);
    if (messages.length) {
      setErrors(messages);
      return;
    }

    setErrors([]);
    submitBtn.disabled = true;
    submitBtn.textContent = copy.submitting;

    // Task 7: UI-only success. Task 8 will POST to PHP API.
    await new Promise((r) => setTimeout(r, 450));

    const day = isBusinessHoursMoscow();
    if (successText) successText.textContent = day ? copy.thankyouDay : copy.thankyouNight;
    formView.classList.add('hidden');
    successView.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = copy.submit;

    // Keep payload for upcoming API wiring.
    window.__leadAppliancePrefill = {
      slug: String(data.get('applianceSlug') || ''),
      label: String(data.get('appliance') || ''),
    };
    console.info('[lead-modal] validated payload', {
      locale,
      name,
      phone: normalizePhone(phone),
      city: String(data.get('city') || ''),
      time: String(data.get('time') || ''),
      appliance: String(data.get('appliance') || ''),
      applianceSlug: String(data.get('applianceSlug') || ''),
      problem: String(data.get('problem') || ''),
      channels: data.getAll('channels'),
    });
  });

  window.__openLeadModal = openModal;
  updateNotice();
}
