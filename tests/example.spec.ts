import {
  test,
  expect,
} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Demo Test', () => {
  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/STORE/);
  });

  test('cart link', async ({ page }) => {
    // Click the cart link.
    await page.getByRole('link', { name: 'Cart' }).click();

    // Expects page to have a heading with the name of Products.
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    expect(page.url().includes('/cast.html')).toBeTruthy();
  });
});
