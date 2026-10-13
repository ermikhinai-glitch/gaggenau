type PickerRoot = HTMLElement;

function getPickers(): PickerRoot[] {
  return Array.from(document.querySelectorAll<PickerRoot>('[data-call-phone-picker]'));
}

function positionPanel(root: PickerRoot): void {
  const trigger = root.querySelector<HTMLElement>('[data-call-phone-trigger]');
  const panel = root.querySelector<HTMLElement>('[data-call-phone-panel]');
  if (!trigger || !panel) return;

  const placement = root.dataset.placement === 'top' ? 'top' : 'bottom';
  const rect = trigger.getBoundingClientRect();
  const gap = 8;
  const margin = 8;

  panel.style.position = 'fixed';
  panel.style.transform = 'none';
  panel.style.right = 'auto';

  // Measure after making visible
  const panelWidth = panel.offsetWidth || 240;
  const left = Math.min(
    Math.max(margin, rect.left),
    window.innerWidth - panelWidth - margin,
  );
  panel.style.left = `${left}px`;

  if (placement === 'top') {
    panel.style.top = 'auto';
    panel.style.bottom = `${window.innerHeight - rect.top + gap}px`;
  } else {
    panel.style.bottom = 'auto';
    panel.style.top = `${rect.bottom + gap}px`;
  }
}

function setOpen(root: PickerRoot, open: boolean): void {
  const trigger = root.querySelector<HTMLElement>('[data-call-phone-trigger]');
  const panel = root.querySelector<HTMLElement>('[data-call-phone-panel]');
  if (!trigger || !panel) return;
  trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  panel.hidden = !open;
  panel.classList.toggle('hidden', !open);
  if (open) positionPanel(root);
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

  window.addEventListener(
    'resize',
    () => {
      for (const root of getPickers()) {
        const trigger = root.querySelector('[data-call-phone-trigger]');
        if (trigger?.getAttribute('aria-expanded') === 'true') positionPanel(root);
      }
    },
    { passive: true },
  );

  window.addEventListener(
    'scroll',
    () => {
      closeAll();
    },
    { passive: true, capture: true },
  );
}
