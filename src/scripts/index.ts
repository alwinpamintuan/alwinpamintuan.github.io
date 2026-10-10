const entries = [...document.querySelectorAll<HTMLDetailsElement>('[data-project]')];

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
    themeToggle.setAttribute('aria-checked', String(theme === 'dark'));
    themeToggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = theme === 'dark' ? '#20201e' : '#f3f2ec';
    });
  };

  themeToggle.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.themePreference = preference;
    try { localStorage.setItem('personal-site:theme', preference); } catch { /* Keep the choice for this page. */ }
    updateTheme();
  });
  systemTheme.addEventListener('change', updateTheme);
  updateTheme();
  themeToggle.hidden = false;
}
