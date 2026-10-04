const sheet = document.querySelector<HTMLElement>('.sheet');
const panel = document.querySelector<HTMLElement>('.schematic-panel');
const toggle = document.querySelector<HTMLButtonElement>('.motion-toggle');
const motionLabel = document.querySelector<HTMLElement>('[data-motion-label]');
const entries = [...document.querySelectorAll<HTMLDetailsElement>('[data-project]')];
const branches = [...document.querySelectorAll<SVGGElement>('[data-branch]')];

const previewMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
entries.forEach((entry) => {
  const summary = entry.querySelector<HTMLElement>('summary');
  const preview = entry.querySelector<HTMLElement>('.project-preview');
  if (!summary || !preview || typeof entry.animate !== 'function') return;

  let animation: Animation | undefined;
  let requestedOpen = entry.open;
  entry.dataset.previewAnimated = 'true';

  const settle = (): void => {
    animation?.cancel();
    animation = undefined;
    entry.open = requestedOpen;
    entry.style.removeProperty('overflow');
    preview.inert = false;
    delete entry.dataset.previewState;
  };

  summary.addEventListener('click', (event) => {
    event.preventDefault();
    // Use the latest requested state so an in-flight close can reverse immediately.
    requestedOpen = animation ? !requestedOpen : !entry.open;
    const from = entry.getBoundingClientRect().height;
    animation?.cancel();
    if (previewMotion.matches) {
      settle();
      return;
    }

    entry.open = true;
    preview.inert = !requestedOpen;
    entry.dataset.previewState = requestedOpen ? 'opening' : 'closing';
    const to = requestedOpen ? entry.getBoundingClientRect().height : summary.getBoundingClientRect().height;
    entry.style.overflow = 'hidden';
    animation = entry.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: 340,
      easing: 'cubic-bezier(.22, 1, .36, 1)',
      fill: 'both',
    });
    animation.onfinish = settle;
  });

  previewMotion.addEventListener('change', () => {
    if (previewMotion.matches && animation) settle();
  });
});

const themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle');

if (themeToggle) {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = root.dataset.themePreference;

  const updateTheme = (): void => {
    const theme = preference ?? (systemTheme.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = theme === 'dark' ? '#20201e' : '#f3f2ec';
    });
  };

  themeToggle.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.themePreference = preference;
    try { localStorage.setItem('project-index:theme', preference); } catch { /* Keep the choice for this page. */ }
    updateTheme();
  });
  systemTheme.addEventListener('change', updateTheme);
  updateTheme();
  themeToggle.hidden = false;
}

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
      highlight(focusedId ?? hoveredId);
    });
    entry.addEventListener('focusin', () => {
      focusedId = entry.dataset.project;
      highlight(focusedId);
    });
    entry.addEventListener('focusout', (event) => {
      if (event.relatedTarget instanceof Node && entry.contains(event.relatedTarget)) return;
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
