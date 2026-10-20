type PickerRoot = HTMLElement;

function getPickers(): PickerRoot[] {
  return Array.from(document.querySelectorAll<PickerRoot>('[data-call-phone-picker]'));
}

function syncWidth(root: PickerRoot): number {
  const trigger = root.querySelector<HTMLElement>('[data-call-phone-trigger]');
  const panel = root.querySelector<HTMLElement>('[data-call-phone-panel]');
  const sizer = root.querySelector<HTMLElement>('[data-call-phone-sizer]');
  if (!trigger || !panel) return 0;

  trigger.style.width = '';
  trigger.style.minWidth = '';
  const triggerWidth = trigger.getBoundingClientRect().width;
  if (triggerWidth < 1) return 0;

  const iconOnly = root.dataset.iconOnly === 'true';
  const sizerWidth = sizer ? sizer.scrollWidth : 0;
  const contentWidth = Math.ceil(Math.max(triggerWidth, sizerWidth));
  const panelWidth = iconOnly ? Math.ceil(Math.max(sizerWidth, triggerWidth)) : contentWidth;
  const fitParent = root.dataset.fit === 'parent';

  trigger.style.boxSizing = 'border-box';
  if (!iconOnly) {
    trigger.style.width = fitParent ? '100%' : `${contentWidth}px`;
    trigger.style.minWidth = fitParent ? '0' : `${contentWidth}px`;
    trigger.style.maxWidth = fitParent ? '100%' : '';
  }
  panel.style.boxSizing = 'border-box';
  panel.style.width = `${panelWidth}px`;
  panel.style.minWidth = `${panelWidth}px`;
  panel.style.maxWidth = `${panelWidth}px`;
  return panelWidth;
}

function positionPanel(root: PickerRoot): void {
  const trigger = root.querySelector<HTMLElement>('[data-call-phone-trigger]');
  const panel = root.querySelector<HTMLElement>('[data-call-phone-panel]');
  if (!trigger || !panel) return;

  const placement = root.dataset.placement === 'top' ? 'top' : 'bottom';
  const gap = 8;
  const margin = 8;
  const panelWidth = syncWidth(root);

  panel.style.position = 'fixed';
  panel.style.transform = 'none';
  panel.style.right = 'auto';
  panel.style.bottom = 'auto';
  panel.style.left = '0px';
  panel.style.top = '0px';

  const origin = panel.getBoundingClientRect();
  const rect = trigger.getBoundingClientRect();
  const viewportLeft = Math.min(
    Math.max(margin, rect.left),
    window.innerWidth - panelWidth - margin,
  );
  panel.style.left = `${viewportLeft - origin.left}px`;

  if (placement === 'top') {
    const height = panel.offsetHeight;
    panel.style.top = `${rect.top - gap - height - origin.top}px`;
  } else {
    panel.style.top = `${rect.bottom + gap - origin.top}px`;
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

  const syncAll = () => {
    for (const root of getPickers()) {
      const trigger = root.querySelector('[data-call-phone-trigger]');
      if (trigger?.getAttribute('aria-expanded') === 'true') positionPanel(root);
      else syncWidth(root);
    }
  };

  syncAll();
  document.fonts?.ready.then(syncAll);

  window.addEventListener('resize', syncAll, { passive: true });

  window.addEventListener(
    'scroll',
    () => {
      closeAll();
    },
    { passive: true, capture: true },
  );
}
