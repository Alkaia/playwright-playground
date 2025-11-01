import { test, expect } from '@playwright/test';
import { HomePage } from 'pageObjects/HomePage';
import { CartPage } from 'pageObjects/CartPage';

/*
 * Homepage E2E Tests
 */

test.describe('Homepage E2E Tests', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
    await homePage.waitForPageReady();

    await expect(homePage.getCartLink()).toBeVisible();
  });

  test('should display homepage with correct title @smoke', async ({ page }) => {
    // Comprehensive title validation
    const title = await homePage.getTitle();
    
    expect(title).toMatch(/STORE/i);
    expect(title.length).toBeGreaterThan(0);
    
    // Verify page URL matches base URL (uses Playwright's baseURL from config)
    expect(page.url()).toContain('demoblaze.com');
  });

  test('should navigate to cart page successfully @smoke', async ({ page }) => {
    // Action
    await homePage.navigateToCart();
    
    // Verification with multiple assertions (in test, not PO)
    await cartPage.waitForPageReady();
    expect(page.url()).toMatch(/cart/i);
    
    // Verify cart is accessible and functional
    const heading = await cartPage.getPageHeadingText();
    
    expect(heading).toMatch(/products/i);
    await expect(cartPage.pageHeading).toBeVisible();
  });

  test('should have products displayed on homepage', async () => {
    // Data validation - verify products exist
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    // Verify product cards are visible
    await expect(homePage.productCard.first()).toBeVisible();
  });

  test('should navigate between pages without errors', async ({ page }) => {
    // Test navigation flow
    await homePage.navigateToCart();
    await expect(page).toHaveURL(/cart/i);
    await cartPage.waitForPageReady();
    
    // Navigate back to home
    await homePage.goto();
    await expect(page).toHaveURL(/index\.html/);
    
    // Verify page is functional after navigation (assertions in test)
    await homePage.waitForPageReady();
    await expect(homePage.getCartLink()).toBeVisible();
    
    // Header check is optional since not all pages have header element
    // This demonstrates how to handle optional UI elements
    const headerVisible = await homePage.isHeaderVisible();
    // Log the result but don't fail - header is not required for page functionality
    if (!headerVisible) {
      console.log('Header element not found - this is acceptable for demoblaze.com');
    }
  });

  test('should handle page interactions correctly', async ({ page }) => {
    // Verify UI elements are interactive
    await expect(homePage.cartLink).toBeVisible();
    await expect(homePage.cartLink).toBeEnabled();
    
    // Verify link has correct attributes
    const href = await homePage.cartLink.getAttribute('href');
    
    expect(href).toBeTruthy();
  });
});

