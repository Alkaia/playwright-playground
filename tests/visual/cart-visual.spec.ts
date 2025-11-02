import { test, expect } from '@playwright/test';
import { HomePage } from 'pageObjects/HomePage';
import { CartPage } from 'pageObjects/CartPage';

/**
 * Cart Page Visual Regression Tests
 */

test.describe('Cart Page Visual Regression', () => {
	let homePage: HomePage;
	let cartPage: CartPage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		cartPage = new CartPage(page);
	});

	test('should match cart page visual snapshot', async ({ page }) => {
		await homePage.goto();
		await homePage.navigateToCart();
		await cartPage.waitForPageReady();

		// Visual regression test for cart page
		await expect(page).toHaveScreenshot('cart-page.png', {
			fullPage: true,
			// Higher threshold to account for OS differences (macOS vs Ubuntu)
			threshold: 0.3
		});
	});
});
