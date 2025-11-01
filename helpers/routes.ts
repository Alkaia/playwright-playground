/**
 * Route constants - Centralized URL paths for navigation
 * This prevents hardcoding URLs across page objects
 */

export const Routes = {
	HOME: '/index.html',
	CART: '/cart.html'
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
