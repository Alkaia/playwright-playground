import { Page, Locator } from '@playwright/test';
import { Timeouts } from 'helpers/constants';

/**
 * Base Page Object Model - demonstrates inheritance and reusable page patterns
 */
export abstract class BasePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Wait for page to be fully loaded
	 * Uses 'load' instead of 'networkidle' to avoid timeouts on pages with continuous network activity
	 */
	async waitForPageLoad(): Promise<void> {
		await this.page.waitForLoadState('load');
	}

	/**
	 * Get page title
	 */
	async getTitle(): Promise<string> {
		return await this.page.title();
	}

	/**
	 * Get current URL
	 */
	getCurrentUrl(): string {
		return this.page.url();
	}

	/**
	 * Navigate to a specific path
	 */
	async navigateTo(path: string): Promise<void> {
		await this.page.goto(path);
		await this.waitForPageLoad();
	}

	/**
	 * Wait for element to be visible with timeout (uses centralized timeout)
	 */
	async waitForVisible(
		selector: Locator,
		timeout: number = Timeouts.ELEMENT_VISIBLE
	): Promise<void> {
		await selector.waitFor({ state: 'visible', timeout });
	}

	/**
	 * Take a screenshot (useful for debugging and visual regression)
	 */
	async takeScreenshot(name: string): Promise<void> {
		await this.page.screenshot({
			path: `test-results/screenshots/${name}-${Date.now()}.png`,
			fullPage: true
		});
	}
}
