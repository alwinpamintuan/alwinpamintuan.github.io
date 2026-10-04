const sheet = document.querySelector<HTMLElement>('.sheet');
const panel = document.querySelector<HTMLElement>('.schematic-panel');
const toggle = document.querySelector<HTMLButtonElement>('.motion-toggle');
const motionLabel = document.querySelector<HTMLElement>('[data-motion-label]');
const entries = [...document.querySelectorAll<HTMLAnchorElement>('[data-project]')];
const branches = [...document.querySelectorAll<SVGGElement>('[data-branch]')];

if (sheet && panel && toggle && motionLabel) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionRequested = true;
  let panelVisible = false;

  const updateMotion = (): void => {
    const enabled = motionRequested && !reducedMotion.matches;
    sheet.dataset.motion = enabled ? 'on' : 'off';
    sheet.dataset.running = enabled && panelVisible && !document.hidden ? 'true' : 'false';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.disabled = reducedMotion.matches;
    toggle.title = reducedMotion.matches ? 'Motion disabled by reduced-motion preference' : '';
    motionLabel.textContent = enabled ? 'on' : 'off';
  };

  const highlight = (id: string | undefined): void => {
    branches.forEach((branch) => {
      branch.classList.toggle('is-active', branch.dataset.branch === id);
    });
  };

  let hoveredId: string | undefined;
  let focusedId: string | undefined;
  entries.forEach((entry) => {
    entry.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      hoveredId = entry.dataset.project;
      highlight(focusedId ?? hoveredId);
    });
    entry.addEventListener('pointerleave', () => {
      hoveredId = undefined;
      highlight(focusedId);
    });
    entry.addEventListener('focus', () => {
      focusedId = entry.dataset.project;
      highlight(focusedId);
    });
    entry.addEventListener('blur', () => {
      focusedId = undefined;
      highlight(hoveredId);
    });
  });

  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    motionRequested = !motionRequested;
    updateMotion();
  });
  reducedMotion.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  const observer = new IntersectionObserver(([entry]) => {
    panelVisible = entry?.isIntersecting ?? false;
    updateMotion();
  });
  observer.observe(panel);
  updateMotion();
}
