import { test, expect } from '@playwright/test';
import { HomePage } from 'pageObjects/HomePage';

/**
 * Homepage Visual Regression Tests
 * These tests compare screenshots against baseline images to detect visual changes
 */

test.describe('Homepage Visual Regression', () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
	});

	test('should match homepage visual snapshot', async ({ page }) => {
		await homePage.goto();
		await homePage.waitForPageReady();

		// Compare current page screenshot with baseline
		// First run creates baseline, subsequent runs compare
		await expect(page).toHaveScreenshot('homepage.png', {
			fullPage: true, // Capture entire page
			// Higher threshold to account for OS differences (macOS vs Ubuntu)
			threshold: 0.3
		});
	});

	test('should match homepage header snapshot', async ({ page }) => {
		await homePage.goto();
		await homePage.waitForPageReady();

		// Visual test for specific component (header/navbar area)
		// Only compares the navbar section
		const navbar = page.locator('nav').first();
		await expect(navbar).toHaveScreenshot('homepage-navbar.png', {
			// Higher threshold to account for OS differences (macOS vs Ubuntu)
			threshold: 0.3
		});
	});
});
