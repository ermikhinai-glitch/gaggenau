const DURATION_MS = 320;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function waitForTransition(panel: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      panel.removeEventListener('transitionend', onEnd);
      window.clearTimeout(timeoutId);
      resolve();
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target !== panel) return;
      if (event.propertyName !== 'grid-template-rows' && event.propertyName !== 'opacity') return;
      // Prefer completing on grid-template-rows; opacity may finish earlier
      if (event.propertyName === 'grid-template-rows') finish();
    };
    panel.addEventListener('transitionend', onEnd);
    const timeoutId = window.setTimeout(finish, DURATION_MS + 120);
  });
}

function setExpanded(panel: HTMLElement, open: boolean, animate: boolean) {
  if (!animate || prefersReducedMotion()) {
    panel.style.transition = 'none';
    panel.style.gridTemplateRows = open ? '1fr' : '0fr';
    panel.style.opacity = open ? '1' : '0';
    void panel.offsetHeight;
    return Promise.resolve();
  }

  panel.style.transition = `grid-template-rows ${DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${DURATION_MS}ms ease`;
  void panel.offsetHeight;
  panel.style.gridTemplateRows = open ? '1fr' : '0fr';
  panel.style.opacity = open ? '1' : '0';
  return waitForTransition(panel);
}

function bindDetails(details: HTMLDetailsElement) {
  if (details.dataset.faqBound === 'true') return;
  details.dataset.faqBound = 'true';

  const summary = details.querySelector('summary');
  const panel = details.querySelector<HTMLElement>('[data-faq-panel]');
  const inner = panel?.querySelector<HTMLElement>('[data-faq-panel-inner]');
  if (!summary || !panel || !inner) return;

  panel.style.display = 'grid';
  panel.style.overflow = 'hidden';
  inner.style.minHeight = '0';
  inner.style.overflow = 'hidden';

  const initiallyOpen = details.open;
  panel.style.transition = 'none';
  panel.style.gridTemplateRows = initiallyOpen ? '1fr' : '0fr';
  panel.style.opacity = initiallyOpen ? '1' : '0';
  void panel.offsetHeight;

  let busy = false;

  summary.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (busy) return;
    busy = true;

    const willOpen = !details.open;

    void (async () => {
      try {
        if (willOpen) {
          details.open = true;
          panel.style.transition = 'none';
          panel.style.gridTemplateRows = '0fr';
          panel.style.opacity = '0';
          void panel.offsetHeight;
          await setExpanded(panel, true, true);
        } else {
          await setExpanded(panel, false, true);
          details.open = false;
        }
      } finally {
        busy = false;
      }
    })();
  });
}

export function initFaqAccordion(root: ParentNode = document): void {
  root.querySelectorAll<HTMLDetailsElement>('details[data-faq-details]').forEach(bindDetails);
}
