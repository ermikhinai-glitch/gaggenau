type Locale = 'ru' | 'en';

type ReviewCopy = {
  submitting: string;
  submit: string;
  errorName: string;
  errorCity: string;
  errorText: string;
  errorConsent: string;
  errorNetwork: string;
};

function initReviewTracks(): void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-reviews-list]').forEach((track) => {
    if (track.dataset.carouselReady === 'true') return;
    track.dataset.carouselReady = 'true';
    if (reduceMotion) return;

    let paused = false;
    const step = () => {
      if (paused) return;
      const card = track.querySelector(':scope > blockquote');
      if (!(card instanceof HTMLElement)) return;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
      const delta = card.getBoundingClientRect().width + gap;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 8) return;
      const next = track.scrollLeft + delta;
      track.scrollTo({ left: next >= max - 8 ? 0 : next, behavior: 'smooth' });
    };

    window.setInterval(step, 4500);
    track.addEventListener('pointerenter', () => {
      paused = true;
    });
    track.addEventListener('pointerleave', () => {
      paused = false;
    });
    track.addEventListener('focusin', () => {
      paused = true;
    });
    track.addEventListener('focusout', () => {
      paused = false;
    });
  });
}

export function initReviewModal(root: HTMLElement): void {
  const locale = (root.dataset.locale as Locale) || 'ru';
  const copy = JSON.parse(root.dataset.copy || '{}') as ReviewCopy;
  const apiUrl = root.dataset.apiUrl || '/api/review.php';

  const dialog = root.querySelector<HTMLElement>('[data-review-dialog]');
  const formView = root.querySelector<HTMLElement>('[data-review-form-view]');
  const successView = root.querySelector<HTMLElement>('[data-review-success-view]');
  const form = root.querySelector<HTMLFormElement>('[data-review-form]');
  const errorBox = root.querySelector<HTMLElement>('[data-review-errors]');
  const submitBtn = root.querySelector<HTMLButtonElement>('[data-review-submit]');
  const nameInput = root.querySelector<HTMLInputElement>('[data-review-name]');
  const cityInput = root.querySelector<HTMLInputElement>('[data-review-city]');
  const textInput = root.querySelector<HTMLTextAreaElement>('[data-review-text]');
  const consentInput = root.querySelector<HTMLInputElement>('[data-review-consent]');

  if (!form || !dialog) return;

  let open = false;
  let lastFocus: HTMLElement | null = null;
  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  initReviewTracks();

  function showForm(): void {
    formView?.classList.remove('hidden');
    successView?.classList.add('hidden');
    if (errorBox) {
      errorBox.textContent = '';
      errorBox.classList.add('hidden');
    }
  }

  function showSuccess(): void {
    formView?.classList.add('hidden');
    successView?.classList.remove('hidden');
  }

  function openModal(): void {
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    form.reset();
    showForm();
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
    if (!open || event.key !== 'Tab') return;
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

  root.querySelectorAll('[data-review-close]').forEach((el) => {
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
    const btn = target.closest('[data-open-review-modal]');
    if (!btn) return;
    event.preventDefault();
    openModal();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get('company') || '').trim()) return;

    const name = String(data.get('name') || nameInput?.value || '').trim();
    const city = String(data.get('city') || cityInput?.value || '').trim();
    const text = String(data.get('text') || textInput?.value || '').trim();
    const consent = Boolean(consentInput?.checked);

    const messages: string[] = [];
    if (!name) messages.push(copy.errorName);
    if (!city) messages.push(copy.errorCity);
    if (!text) messages.push(copy.errorText);
    if (!consent) messages.push(copy.errorConsent);

    if (errorBox) {
      errorBox.textContent = messages.filter(Boolean).join(' · ');
      errorBox.classList.toggle('hidden', messages.length === 0);
    }
    if (messages.length) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = copy.submitting;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          locale,
          name: name.slice(0, 80),
          city: city.slice(0, 80),
          text: text.slice(0, 800),
          consent,
          company: '',
          page: window.location.pathname,
        }),
      });
      if (response.status === 422 || response.status === 429) {
        throw new Error('rejected');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'rejected') {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = copy.submit;
        }
        if (errorBox) {
          errorBox.textContent = copy.errorNetwork;
          errorBox.classList.remove('hidden');
        }
        return;
      }
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = copy.submit;
    }

    showSuccess();
  });
}
