type PickerRoot = HTMLElement & {
  querySelector(selectors: '[data-call-phone-trigger]'): HTMLButtonElement | null;
  querySelector(selectors: '[data-call-phone-panel]'): HTMLElement | null;
};

function getPickers(): PickerRoot[] {
  return Array.from(document.querySelectorAll<PickerRoot>('[data-call-phone-picker]'));
}

function setOpen(root: PickerRoot, open: boolean): void {
  const trigger = root.querySelector('[data-call-phone-trigger]');
  const panel = root.querySelector('[data-call-phone-panel]');
  if (!trigger || !panel) return;
  trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  panel.hidden = !open;
  panel.classList.toggle('hidden', !open);
}

function closeAll(except?: PickerRoot): void {
  for (const root of getPickers()) {
    if (except && root === except) continue;
    setOpen(root, false);
  }
}

let bound = false;

export function initCallPhonePickers(): void {
  if (bound || typeof document === 'undefined') return;
  bound = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest('[data-call-phone-trigger]');
    if (trigger instanceof HTMLElement) {
      const root = trigger.closest<PickerRoot>('[data-call-phone-picker]');
      if (!root) return;
      event.preventDefault();
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      closeAll(willOpen ? root : undefined);
      setOpen(root, willOpen);
      return;
    }

    if (target.closest('[data-call-phone-panel]')) return;
    closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
}
