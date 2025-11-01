import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Routes } from 'helpers/routes';

/**
 * Cart Page Object
 */
export class CartPage extends BasePage {
	readonly pageHeading: Locator;
	readonly cartItems: Locator;
	readonly placeOrderButton: Locator;
	readonly totalPrice: Locator;

	static readonly PATH = Routes.CART;

	constructor(page: Page) {
		super(page);
		this.pageHeading = page.getByRole('heading', { name: /products/i });
		this.cartItems = page.locator('.success');
		this.placeOrderButton = page.getByRole('button', { name: /place order/i });
		this.totalPrice = page.locator('#totalp');
	}

	/**
	 * Navigate to cart page
	 */
	async goto(): Promise<void> {
		await this.navigateTo(CartPage.PATH);
	}

	/**
	 * Wait for cart page to be ready (wait for key elements, no assertions)
	 */
	async waitForPageReady(): Promise<void> {
		await this.waitForVisible(this.pageHeading);
	}

	/**
	 * Get number of items in cart
	 */
	async getCartItemCount(): Promise<number> {
		return await this.cartItems.count();
	}

	/**
	 * Get total price from cart
	 */
	async getTotalPrice(): Promise<string> {
		await this.waitForVisible(this.totalPrice);
		return (await this.totalPrice.textContent()) || '0';
	}

	/**
	 * Get page heading text
	 */
	async getPageHeadingText(): Promise<string> {
		await this.waitForVisible(this.pageHeading);
		return (await this.pageHeading.textContent()) || '';
	}
}
