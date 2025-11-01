import { test, expect } from '@playwright/test';
import { ApiClient } from 'helpers/apiClient';
import { apiTestData } from 'helpers/testData';
import { User } from 'helpers/interfaces';

/**
 * Enhanced API Tests - Demonstrates:
 * - API client abstraction pattern
 * - Comprehensive response validation
 * - Error handling and edge cases
 * - Test data management
 */

test.describe('Users API Tests', () => {
	let apiClient: ApiClient;

	test.beforeEach(async ({ request }) => {
		apiClient = new ApiClient(request);
	});

	test('should fetch user data successfully', async () => {
		const response = await apiClient.getResponse(
			`/users/${apiTestData.users.validUserId}`
		);
		const data = await apiClient.get<User>(
			`/users/${apiTestData.users.validUserId}`
		);

		// Comprehensive validation
		expect(apiClient.isSuccessStatus(response.status())).toBe(true);
		expect(response.status()).toBe(200);
		expect(data).toHaveProperty('id', apiTestData.users.validUserId);
		expect(data).toHaveProperty('name');
		expect(data).toHaveProperty('email');
		expect(typeof data.name).toBe('string');
		expect(data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Email format validation
	});

	test('should handle 404 error for non-existent user', async () => {
		const response = await apiClient.getResponse(
			`/users/${apiTestData.users.invalidUserId}`
		);

		// Error handling validation
		expect(apiClient.isClientError(response.status())).toBe(true);
		expect(response.status()).toBe(404);
	});

	test('should return correct content-type header', async () => {
		const response = await apiClient.getResponse('/users');
		const headers = response.headers();

		// Header validation
		expect(headers['content-type']).toContain('application/json');
		expect(headers).toHaveProperty('content-type');
	});

	test('should fetch all users and validate array structure', async () => {
		const response = await apiClient.getResponse('/users');
		const data = await apiClient.get<User[]>('/users');

		expect(response.status()).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);

		// Validate first user structure
		const firstUser = data[0];
		expect(firstUser).toHaveProperty('id');
		expect(firstUser).toHaveProperty('name');
		expect(firstUser).toHaveProperty('email');
	});

	test('should handle authenticated requests with custom headers', async () => {
		const response = await apiClient.getResponse('/users', {
			headers: {
				Authorization: 'Bearer test-token',
				'X-Custom-Header': 'test-value'
			}
		});

		expect(apiClient.isSuccessStatus(response.status())).toBe(true);
		expect(response.headers()).toBeDefined();
	});
});
