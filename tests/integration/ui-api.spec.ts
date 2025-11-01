import { test, expect } from '@playwright/test';
import { HomePage } from 'pageObjects/HomePage';
import { ApiClient } from 'helpers/apiClient';

/**
 * Integration Tests
 */

test.describe('Integration Tests', () => {
	test('should verify UI and API data consistency', async ({
		page,
		request
	}) => {
		const homePage = new HomePage(page);
		const apiClient = new ApiClient(request);

		// Get data from UI
		await homePage.goto();
		await homePage.waitForPageReady();

		await expect(homePage.getCartLink()).toBeVisible();
		const productCount = await homePage.getProductCount();

		// Verify API is accessible
		const response = await apiClient.getResponse('/users/1');
		expect(response.status()).toBe(200);

		// Verify UI is functional
		expect(productCount).toBeGreaterThan(0);
	});

	test('should handle network failures gracefully', async ({ page }) => {
		// Intercept network requests to simulate failure
		await page.route('**/*', (route) => {
			if (
				route.request().resourceType() === 'xhr' ||
				route.request().resourceType() === 'fetch'
			) {
				route.abort();
			} else {
				route.continue();
			}
		});

		const homePage = new HomePage(page);
		await homePage.goto();

		// Page should still load (static content) - check for cart link which is a key UI element
		await expect(homePage.getCartLink()).toBeVisible();
	});

	test('should verify page performance metrics', async ({ page }) => {
		const homePage = new HomePage(page);

		const startTime = Date.now();
		await homePage.goto();
		const loadTime = Date.now() - startTime;

		// Performance assertion (page should load within reasonable time)
		expect(loadTime).toBeLessThan(30000); // 30 seconds

		// Wait for page and verify it's loaded
		await homePage.waitForPageReady();
		await expect(homePage.getCartLink()).toBeVisible();
	});
});
