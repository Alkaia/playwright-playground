import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiClient } from 'helpers/apiClient';
import { apiTestData } from 'helpers/testData';
import { Post } from 'helpers/interfaces';

/**
 * CRUD API Tests
 */

test.describe('Posts API CRUD Tests', () => {
	let apiClient: ApiClient;
	let request: APIRequestContext;

	test.beforeEach(async ({ request: req }) => {
		request = req;
		apiClient = new ApiClient(req);
	});

	test('should create a new post', async () => {
		const response = await request.post(`${apiClient.getBaseUrl()}/posts`, {
			data: apiTestData.posts.newPost
		});
		const data = await apiClient.post<Post>(
			'/posts',
			apiTestData.posts.newPost
		);

		// Validate creation response
		expect(response.status()).toBe(201);
		expect(data).toHaveProperty('id');
		expect(data.title).toBe(apiTestData.posts.newPost.title);
		expect(data.body).toBe(apiTestData.posts.newPost.body);
		expect(typeof data.id).toBe('number');
		expect(data.id).toBeGreaterThan(0);
	});

	test('should update an existing post', async () => {
		const updatedData = {
			...apiTestData.posts.newPost,
			title: 'Updated Title',
			body: 'Updated body content'
		};

		const response = await request.put(
			`${apiClient.getBaseUrl()}/posts/${apiTestData.posts.validPostId}`,
			{
				data: updatedData
			}
		);
		const data = await apiClient.put<{ title: string; body: string }>(
			`/posts/${apiTestData.posts.validPostId}`,
			updatedData
		);

		expect(response.status()).toBe(200);
		expect(data.title).toBe(updatedData.title);
		expect(data.body).toBe(updatedData.body);
	});

	test('should retrieve a specific post', async () => {
		const response = await apiClient.getResponse(
			`/posts/${apiTestData.posts.validPostId}`
		);
		const data = await apiClient.get<{ id: number; title: string }>(
			`/posts/${apiTestData.posts.validPostId}`
		);

		expect(response.status()).toBe(200);
		expect(data).toHaveProperty('id', apiTestData.posts.validPostId);
		expect(data).toHaveProperty('title');
		expect(typeof data.title).toBe('string');
	});

	test('should delete a post', async () => {
		const response = await request.delete(
			`${apiClient.getBaseUrl()}/posts/${apiTestData.posts.validPostId}`
		);
		await apiClient.delete(`/posts/${apiTestData.posts.validPostId}`);

		expect(response.status()).toBe(200);
	});

	test('should retrieve all posts with pagination-like validation', async () => {
		const response = await apiClient.getResponse('/posts');
		const data = await apiClient.get<Array<{ id: number }>>('/posts');

		expect(response.status()).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);

		// Validate posts have required fields
		const samplePost = data[0];
		expect(samplePost).toHaveProperty('id');
		expect(typeof samplePost.id).toBe('number');
	});
});
