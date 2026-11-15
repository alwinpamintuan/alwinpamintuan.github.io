import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

test('bento cards launch directly from their titles, screenshots, and actions', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projects. Experiments. Whatever’s next.');
  await expect(page.locator('.site-home')).toHaveText('John Alwin Pamintuan');
  await expect(page.locator('.site-home')).toHaveAttribute('href', '/');
  await expect(page.locator('.site-header .page-menu, .site-header nav')).toHaveCount(0);
  await expect(page.locator('.bento-grid > li')).toHaveCount(4);
  await expect(page.locator('.project-caption h2')).toHaveText(['I/O', 'Raffler']);
  await expect(page.locator('.project-caption p')).toHaveText(['An interactive way to test your computer peripherals.', 'If Rappler made a raffle app.']);
  await expect(page.locator('.about-aside')).toHaveCount(0);
  await expect(page.locator('.about-copy')).toHaveText('Things I make outside of work.');
  await expect(page.locator('#index-title span')).toHaveText(['Projects.', 'Experiments.', 'Whatever’s next.']);
  await expect(page.locator('details')).toHaveCount(0);
  for (const [name, slug] of [['I/O', 'io'], ['Raffler', 'raffler']]) {
    const destination = `https://alwinpamintuan.github.io/${slug}/`;
    await page.route(destination, (route) => route.fulfill({ body: '<h1>Tool destination</h1>', contentType: 'text/html' }));
    for (const target of ['h2', 'img', '.card-action']) {
      await page.getByRole('link', { name: `Open ${name}`, exact: true }).locator(target).click();
      await expect(page).toHaveURL(destination);
      await page.goto('/');
    }
  }
});

test('keyboard access follows the visual card order with visible focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to index' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#index')).toBeFocused();
  for (const name of ['Open I/O', 'Open Raffler', 'View résumé', 'GitHub', 'LinkedIn', 'Email', 'Back to top']) {
    await page.keyboard.press('Tab');
    const link = page.getByRole('link', { name, exact: true });
    await expect(link).toBeFocused();
    expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('solid');
  }
});

test('the grid accommodates zero through five projects without empty final slots', async ({ page }) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    for (const count of [0, 1, 2, 3, 4, 5]) {
      await page.goto('/');
      await page.evaluate((count) => {
        const grid = document.querySelector<HTMLElement>('.bento-grid')!;
        const template = grid.querySelector('[data-kind="project"]')!.cloneNode(true) as HTMLElement;
        grid.querySelectorAll('[data-kind="project"]').forEach((project) => project.remove());
        if (!count) grid.dataset.empty = 'true';
        for (let index = 0; index < count; index++) {
          const project = template.cloneNode(true) as HTMLElement;
          project.querySelector('[id]')?.removeAttribute('id');
          grid.insertBefore(project, grid.querySelector('.bento-resume'));
        }
      }, count);
      expect(await page.locator('[data-kind="project"]').count()).toBe(count);
      const grid = (await page.locator('.bento-grid').boundingBox())!;
      const resume = (await page.locator('.bento-resume').boundingBox())!;
      expect(Math.abs(resume.x + resume.width - grid.x - grid.width)).toBeLessThan(2);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
  }
});

test('system theme, saved preference, legacy migration, and blocked storage', async ({ page, browser }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const toggle = page.getByRole('switch', { name: 'Dark mode' });
  await expect(toggle).toBeChecked();
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(toggle).not.toBeChecked();
  await toggle.press('Space');
  await expect(toggle).toBeChecked();
  await page.reload();
  await expect(toggle).toBeChecked();
  await page.evaluate(() => { localStorage.clear(); localStorage.setItem('project-index:theme', 'light'); });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload();
  await expect(toggle).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem('personal-site:theme'))).toBe('light');
  const context = await browser.newContext();
  await context.addInitScript(() => { Storage.prototype.getItem = Storage.prototype.setItem = () => { throw new Error('Unavailable'); }; });
  const isolated = await context.newPage();
  await isolated.goto('http://127.0.0.1:4323/');
  await isolated.getByRole('switch', { name: 'Dark mode' }).click();
  await expect(isolated.getByRole('switch', { name: 'Dark mode' })).toBeChecked();
  await context.close();
});

test('all card links work without JavaScript and theme follows the system', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4323/');
  await expect(page.getByRole('link', { name: 'Open I/O', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open Raffler', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View résumé', exact: true })).toBeVisible();
  await expect(page.getByRole('switch')).toBeHidden();
  await expect(page.locator('.contact-tile')).toHaveCount(3);
  await expect(page.getByRole('link', { name: 'Email', exact: true })).toHaveAttribute('href', 'mailto:alwinpamintuan@gmail.com');
  await page.route('https://alwinpamintuan.github.io/io/', (route) => route.fulfill({ body: '<h1>I/O destination</h1>', contentType: 'text/html' }));
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(32, 32, 30)');
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundImage)).toBe('none');
  await page.emulateMedia({ media: 'print' });
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(255, 255, 255)');
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundImage)).toBe('none');
  await page.emulateMedia({ media: 'screen' });
  await page.getByRole('link', { name: 'Open I/O', exact: true }).click();
  await expect(page.getByRole('heading')).toHaveText('I/O destination');
  await context.close();
});

test('responsive layouts, both themes, readable previews, and accessibility', async ({ page }) => {
  await mkdir('.verification/screenshots', { recursive: true });
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    for (const width of [375, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: width === 1920 ? 1080 : 960 });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
      expect(await page.evaluate(() => getComputedStyle(document.body).backgroundImage)).toBe('none');
      expect(await page.locator('.project-card').first().evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
      expect(await page.locator('.project-screenshot').first().evaluate((image) => getComputedStyle(image).filter)).toBe('none');
      await page.screenshot({ path: `.verification/screenshots/projects-${colorScheme}-${width}.png`, fullPage: true });
    }
  }
  await page.setViewportSize({ width: 640, height: 450 }); // Layout viewport at 200% of a 1280px desktop.
  await page.goto('/');
  await page.locator('.contact-detail').last().evaluate((element) => { element.textContent = 'AnExtremelyLongUnbrokenContactAddressForLayoutTesting@example.com'; });
  await page.locator('.project-caption h2').first().evaluate((element) => { element.textContent = 'AnExtremelyLongUnbrokenProjectNameThatMustWrap'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test('the footer ends the page and extra projects grow the desktop naturally', async ({ page }) => {
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    for (const [width, height] of [[375, 960], [768, 960], [1440, 960], [1920, 1080]]) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const footer = (await page.locator('.site-footer').boundingBox())!;
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      expect(Math.abs(footer.y + footer.height - pageHeight)).toBeLessThan(2);
      if (width > 900) {
        expect(pageHeight).toBe(height);
        const header = (await page.locator('.site-header').boundingBox())!;
        const main = (await page.locator('main').boundingBox())!;
        expect(Math.abs(main.y - header.height - (footer.y - main.y - main.height))).toBeLessThan(2);
      }
    }
  }
  await page.evaluate(() => {
    const grid = document.querySelector('.bento-grid')!;
    const project = grid.querySelector('[data-kind="project"]')!;
    for (let index = 0; index < 6; index++) grid.insertBefore(project.cloneNode(true), grid.lastElementChild);
  });
  const grid = (await page.locator('.bento-grid').boundingBox())!;
  const footer = (await page.locator('.site-footer').boundingBox())!;
  expect(footer.y).toBeGreaterThan(grid.y + grid.height);
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeGreaterThan(1080);
});

test('shared theme and navigation connect the two production builds', async ({ page }) => {
  test.skip(!process.env.COMPANION_DIST, 'Set COMPANION_DIST to the companion production build.');
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  await page.getByRole('link', { name: 'View résumé', exact: true }).click();
  await expect(page).toHaveURL(/\/resume\/$/);
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeChecked();
  await expect(page.locator('.site-home')).toHaveText('John Alwin Pamintuan');
  await expect(page.locator('.site-home')).toHaveAttribute('href', '/');
  // Published origin links are absolute on the résumé; map that origin back to the local combined build.
  await page.route('https://alwinpamintuan.github.io/', (route) => route.fulfill({ status: 302, headers: { location: 'http://127.0.0.1:4323/' } }));
  await page.getByRole('link', { name: 'Explore projects', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projects. Experiments. Whatever’s next.');
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeChecked();
});

test('cards give tactile pointer feedback and respect reduced motion immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const card = page.getByRole('link', { name: 'Open I/O', exact: true });
  await card.hover();
  await expect.poll(() => card.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');
  await page.mouse.down();
  expect(await card.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await card.hover();
  expect(await card.evaluate((element) => getComputedStyle(element).transform)).toBe('none');
});


test('the companion r�sum� keeps current content compact and controls usable', async ({ page }) => {
  test.skip(!process.env.COMPANION_DIST, 'Set COMPANION_DIST to the companion production build.');
  for (const width of [375, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width === 1920 ? 1080 : 960 });
    await page.goto('/resume/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    if (width === 1440) expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThanOrEqual(1600);
    for (const selector of ['.hero-actions a', '.certification .text-link', '.theme-toggle', '.bridge-action']) {
      for (const control of await page.locator(selector).all()) expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
  }
});
