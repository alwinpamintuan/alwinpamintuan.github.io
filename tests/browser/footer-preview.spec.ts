import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

test('contact tiles wrap, launch natively, and give reduced-motion-safe feedback', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('.site-footer');
  await expect(footer.locator('.contact-label')).toHaveText(['GitHub', 'LinkedIn', 'Email']);
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    const [github, linkedin, email] = await footer.locator('.contact-tile').all();
    const first = (await github.boundingBox())!;
    const second = (await linkedin.boundingBox())!;
    const third = (await email.boundingBox())!;
    expect(Math.abs(first.y - second.y)).toBeLessThan(1);
    if (width < 601) {
      expect(third.y).toBeGreaterThan(first.y + first.height);
      expect(third.width).toBeGreaterThan(first.width * 1.9);
    } else expect(Math.abs(first.y - third.y)).toBeLessThan(1);
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const tile = footer.getByRole('link', { name: 'GitHub', exact: true });
  await tile.hover();
  await expect.poll(() => tile.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');
  await page.mouse.down();
  expect(await tile.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m22)).toBeCloseTo(.99, 2);
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await tile.hover();
  expect(await tile.evaluate((element) => getComputedStyle(element).transform)).toBe('none');
  await page.route('https://github.com/alwinpamintuan', (route) => route.fulfill({ body: '<h1>Profile destination</h1>', contentType: 'text/html' }));
  await tile.press('Enter');
  await expect(page.getByRole('heading')).toHaveText('Profile destination');
});

test('preview crops retain original color and a compact stable window', async ({ page }) => {
  await page.goto('/');
  const image = page.locator('.project-screenshot').first();
  for (const [width, height] of [[400, 900], [1800, 300]]) {
    await image.evaluate(async (element, { width, height }) => {
      const image = element as HTMLImageElement;
      image.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"><rect width="100%" height="100%" fill="#ff6410"/></svg>');
      image.width = width; image.height = height;
      await image.decode();
    }, { width, height });
    const box = (await image.boundingBox())!;
    expect(box.height).toBe(216);
    expect(box.width).toBeGreaterThan(box.height);
    expect(await image.evaluate((element) => ({ fit: getComputedStyle(element).objectFit, filter: getComputedStyle(element).filter }))).toEqual({ fit: 'cover', filter: 'none' });
    expect(await page.locator('.project-image-well').first().evaluate((element) => getComputedStyle(element).padding)).toBe('8px');
  }
});

test('combined preview loads the theme control and matching footers on every résumé route', async ({ page }) => {
  test.skip(!process.env.COMPANION_DIST, 'Requires the companion production build.');
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  const footer = await page.locator('.contact-tile').evaluateAll((elements) => elements.map((element) => ({ label: element.getAttribute('aria-label'), href: element.getAttribute('href'), detail: element.querySelector('.contact-detail')?.textContent })));
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  await page.getByRole('link', { name: 'View résumé', exact: true }).click();
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeVisible();
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeChecked();
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  for (const path of ['/resume/', '/resume/resume/', '/resume/404.html']) {
    await page.goto(path);
    await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeVisible();
    await expect(page.getByRole('switch', { name: 'Dark mode' })).not.toBeChecked();
    expect(await page.locator('.contact-tile').evaluateAll((elements) => elements.map((element) => ({ label: element.getAttribute('aria-label'), href: element.getAttribute('href'), detail: element.querySelector('.contact-detail')?.textContent })))).toEqual(footer);
    await page.getByRole('switch', { name: 'Dark mode' }).click();
    await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeChecked();
    await page.getByRole('switch', { name: 'Dark mode' }).click();
  }
  await page.locator('.site-home').click();
  await expect(page).toHaveURL('http://127.0.0.1:4323/');
  expect(errors).toEqual([]);
  await page.evaluate(() => localStorage.clear());
  await mkdir('.verification/screenshots', { recursive: true });
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    for (const width of [375, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: width === 1920 ? 1080 : 960 });
      await page.goto('/resume/');
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => getComputedStyle(document.body).backgroundImage)).toBe('none');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(audit.violations).toEqual([]);
      await page.screenshot({ path: '.verification/screenshots/resume-' + colorScheme + '-' + width + '.png', fullPage: true });
    }
  }
  await page.setViewportSize({ width: 640, height: 450 });
  await page.goto('/resume/');
  await page.locator('.contact-detail').last().evaluate((element) => { element.textContent = 'AnExtremelyLongUnbrokenContactAddressForLayoutTesting@example.com'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test('desktop cards stay compact and social icons retain clear labels', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('/');
  expect((await page.locator('.bento-grid').boundingBox())!.height).toBeLessThan(650);
  expect((await page.locator('.project-card').first().boundingBox())!.height).toBeLessThan(360);
  await expect(page.locator('.site-footer .social-icon')).toHaveCount(3);
  await expect(page.locator('.site-footer .contact-label')).toHaveText(['GitHub', 'LinkedIn', 'Email']);
});
