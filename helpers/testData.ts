/**
 * Test Data Management - demonstrates data-driven testing approach
 */

export interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
}

export interface UserCredentials {
	username: string;
	password: string;
}

/**
 * Test data fixtures for e-commerce scenarios
 */
export const testProducts: Product[] = [
	{ id: 1, name: 'Samsung galaxy s6', price: 360, category: 'Phones' },
	{ id: 2, name: 'Nokia lumia 1520', price: 820, category: 'Phones' },
	{ id: 3, name: 'Nexus 6', price: 650, category: 'Phones' }
];

export const validUserCredentials: UserCredentials = {
	username: 'testuser',
	password: 'testpass123'
};

/**
 * API test data
 */
export const apiTestData = {
	users: {
		validUserId: 1,
		invalidUserId: 99999
	},
	posts: {
		validPostId: 1,
		newPost: {
			title: 'Test Automation Post',
			body: 'Created by Playwright automation framework',
			userId: 1
		}
	}
};
