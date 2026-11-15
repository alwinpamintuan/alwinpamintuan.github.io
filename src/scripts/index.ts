import './site-navigation';

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
