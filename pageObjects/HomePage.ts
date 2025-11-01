import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Routes } from 'helpers/routes';
import { Timeouts } from 'helpers/constants';

/**
 * Home Page Object
 */
export class HomePage extends BasePage {
	// Locators
	readonly header: Locator;
	readonly cartLink: Locator;
	readonly productCard: Locator;
	readonly navbar: Locator;

	static readonly PATH = Routes.HOME;

	constructor(page: Page) {
		super(page);
		this.header = page.locator('header');
		this.cartLink = page.getByRole('link', { name: /cart/i });
		this.productCard = page.locator('.card');
		this.navbar = page.locator('nav');
	}

	/**
	 * Navigate to home page
	 */
	async goto(): Promise<void> {
		await this.navigateTo(HomePage.PATH);
	}

	/**
	 * Navigate to cart page (uses CartPage path and centralized timeout)
	 */
	async navigateToCart(): Promise<void> {
		await this.cartLink.click();
		await this.page.waitForURL((url) => url.pathname.includes('cart'), {
			timeout: Timeouts.NAVIGATION
		});
		await this.waitForPageLoad();
	}

	/**
	 * Wait for page to be ready (wait for key elements, no assertions)
	 * Uses cartLink as primary indicator since header might not exist on all pages
	 */
	async waitForPageReady(): Promise<void> {
		await this.waitForVisible(this.cartLink);
		// Try to wait for header, but don't fail if it doesn't exist
		try {
			await this.waitForVisible(this.header, Timeouts.QUICK);
		} catch {
			// Header is optional - some pages might not have it
		}
	}

	/**
	 * Get product count on the page
	 */
	async getProductCount(): Promise<number> {
		return await this.productCard.count();
	}

	/**
	 * Click on a specific product by index
	 */
	async clickProduct(index: number): Promise<void> {
		const product = this.productCard.nth(index);
		await this.waitForVisible(product);
		await product.click();
		await this.waitForPageLoad();
	}

	/**
	 * Get header element visibility state
	 */
	async isHeaderVisible(): Promise<boolean> {
		try {
			await this.waitForVisible(this.header, Timeouts.NAVIGATION);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Get cart link element
	 */
	getCartLink(): Locator {
		return this.cartLink;
	}
}
