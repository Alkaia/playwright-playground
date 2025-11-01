/**
 * Test Constants - Centralized timeout and configuration values
 * All timeouts should be defined here for maintainability
 */

export const Timeouts = {
	/** Test execution timeout - maximum time a test can run */
	TEST: 30000,
	/** Expect/assertion timeout - how long to wait for assertions */
	EXPECT: 5000,
	/** Default timeout for element visibility checks */
	ELEMENT_VISIBLE: 10000,
	/** Timeout for navigation/URL changes */
	NAVIGATION: 5000,
	/** Timeout for quick checks */
	QUICK: 3000,
	/** Timeout for slow operations */
	SLOW: 30000
} as const;
