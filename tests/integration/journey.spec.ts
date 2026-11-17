import { test, expect } from '@playwright/test';

// Prevent separate deployments breaking discovery, downloads, or the shared preference.
test('visitors navigate between both builds and retain their chosen theme', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  await page.getByRole('link', { name: 'View résumé', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4323/resume/');
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeChecked();
  const dark = await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor);
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  await expect.poll(() => page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(dark);
  await page.getByRole('link', { name: 'View résumé', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4323/resume/resume/');
  await expect(page.getByRole('switch', { name: 'Dark mode' })).not.toBeChecked();
  for (const name of ['PDF ↓', 'Word ↓']) {
    const href = await page.getByRole('link', { name, exact: true }).getAttribute('href');
    expect((await request.get(href!)).ok(), href!).toBeTruthy();
  }
  await page.reload();
  await expect(page.getByRole('switch', { name: 'Dark mode' })).not.toBeChecked();
  await page.getByRole('link', { name: 'Back to résumé', exact: false }).click();
  await page.getByRole('link', { name: 'Explore projects', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4323/');
  await expect(page.getByRole('switch', { name: 'Dark mode' })).not.toBeChecked();
  await page.goto('/resume/404.html');
  await expect(page.getByRole('switch', { name: 'Dark mode' })).not.toBeChecked();
  await page.getByRole('link', { name: 'John Alwin Pamintuan', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4323/');
  expect(errors).toEqual([]);
});
