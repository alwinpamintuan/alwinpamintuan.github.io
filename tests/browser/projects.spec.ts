import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('project and contact links expose the intended native destinations', async ({ page, request }) => {
  await page.goto('/');
  for (const [name, href] of [
    ['Open I/O', 'https://alwinpamintuan.github.io/io/'],
    ['Open Raffler', 'https://alwinpamintuan.github.io/raffler/'],
    ['View résumé', '/resume/'],
    ['GitHub', 'https://github.com/alwinpamintuan'],
    ['LinkedIn', 'https://www.linkedin.com/in/alwinpamintuan/'],
    ['Email', 'mailto:alwinpamintuan@gmail.com'],
  ]) {
    const link = page.getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', href);
    await link.click({ trial: true });
  }
  for (const name of ['Open I/O', 'Open Raffler']) {
    const card = page.getByRole('link', { name, exact: true });
    await card.getByRole('heading').click({ trial: true });
    await card.getByRole('img').click({ trial: true });
    await card.getByText('Open app').click({ trial: true });
  }
  for (const image of await page.getByRole('img').all()) {
    const src = await image.getAttribute('src');
    expect((await request.get(src!)).ok(), src!).toBeTruthy();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});

test('skip link and keyboard navigation reach the page actions', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 600 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to index' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  for (const name of ['Open I/O', 'Open Raffler', 'View résumé', 'GitHub', 'LinkedIn', 'Email', 'Back to top']) {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name, exact: true })).toBeFocused();
  }
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeInViewport();
});

test('Back to top appears after scrolling and stays outside the cards', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1280, 1279, 375]) {
    await page.setViewportSize({ width, height: 400 });
    await page.goto('/');
    const backToTop = page.getByRole('link', { name: 'Back to top' });
    await expect(backToTop).toBeHidden();
    await page.keyboard.press('End');
    await expect(backToTop).toBeVisible();

    const { contacts, control } = await backToTop.evaluate((element) => ({
      contacts: element.closest('footer')!.querySelector('nav')!.getBoundingClientRect().toJSON(),
      control: element.getBoundingClientRect().toJSON(),
    }));
    if (width === 1280) {
      expect(control.left).toBeGreaterThan(contacts.right);
      expect(control.bottom).toBeLessThan(400);
    } else {
      expect(control.top).toBeGreaterThanOrEqual(contacts.bottom);
    }

    await backToTop.click();
    await expect(backToTop).toBeHidden();
    await expect(page.getByRole('main')).toBeFocused();
  }
});

test('theme follows the system until selected and persists after reload', async ({ page }) => {
  const background = () => page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor);
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const toggle = page.getByRole('switch', { name: 'Dark mode' });
  await expect(toggle).not.toBeChecked();
  const light = await background();
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(toggle).toBeChecked();
  await expect.poll(background).not.toBe(light);
  await toggle.press('Space');
  await expect(toggle).not.toBeChecked();
  await expect.poll(background).toBe(light);
  await page.reload();
  await expect(toggle).not.toBeChecked();
  await expect.poll(background).toBe(light);
});

test('legacy theme preference survives migration and another reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('project-index:theme', 'light'));
  await page.reload();
  const toggle = page.getByRole('switch', { name: 'Dark mode' });
  await expect(toggle).not.toBeChecked();
  await page.evaluate(() => localStorage.removeItem('project-index:theme'));
  await page.reload();
  await expect(toggle).not.toBeChecked();
});

test('projects and contacts remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'light' });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4323/');
    for (const name of ['Open I/O', 'Open Raffler', 'View résumé', 'GitHub', 'LinkedIn', 'Email']) {
      await expect(page.getByRole('link', { name, exact: true })).toBeVisible();
    }
    await expect(page.getByRole('switch')).toBeHidden();
    const light = await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor);
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect.poll(() => page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(light);
  } finally { await context.close(); }
});

for (const colorScheme of ['light', 'dark'] as const) test(`content remains accessible and reflows in ${colorScheme} mode`, async ({ page }) => {
  await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
  for (const [width, height] of [[375, 960], [768, 960], [1440, 960], [640, 450]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px`).toBeTruthy();
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
  }
});
