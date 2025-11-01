import { APIRequestContext } from '@playwright/test';
import { JsonValue } from 'helpers/types';

/**
 * API Client
 * Uses API_BASE_URL environment variable or defaults to JSONPlaceholder
 */
export class ApiClient {
	constructor(
		private request: APIRequestContext,
		private baseUrl: string = process.env.API_BASE_URL ||
			'https://jsonplaceholder.typicode.com'
	) {}

	/**
	 * Get the base URL being used
	 */
	getBaseUrl(): string {
		return this.baseUrl;
	}

	/**
	 * Generic GET request - returns typed data
	 */
	async get<T>(
		endpoint: string,
		options?: { headers?: Record<string, string> }
	): Promise<T> {
		const response = await this.request.get(
			`${this.baseUrl}${endpoint}`,
			options
		);
		return (await response.json()) as T;
	}

	/**
	 * Generic POST request - returns typed data
	 */
	async post<T>(
		endpoint: string,
		body: Record<string, JsonValue> | JsonValue[],
		options?: { headers?: Record<string, string> }
	): Promise<T> {
		const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
			data: body,
			...options
		});
		return (await response.json()) as T;
	}

	/**
	 * Generic PUT request - returns typed data
	 */
	async put<T>(
		endpoint: string,
		body: Record<string, JsonValue> | JsonValue[]
	): Promise<T> {
		const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
			data: body
		});
		return (await response.json()) as T;
	}

	/**
	 * Generic DELETE request - returns void
	 */
	async delete(endpoint: string): Promise<void> {
		await this.request.delete(`${this.baseUrl}${endpoint}`);
	}

	/**
	 * Get raw response for status/header validation
	 */
	async getResponse(
		endpoint: string,
		options?: { headers?: Record<string, string> }
	): Promise<Awaited<ReturnType<APIRequestContext['get']>>> {
		return await this.request.get(`${this.baseUrl}${endpoint}`, options);
	}

	/**
	 * Verify response is successful (2xx status codes)
	 */
	isSuccessStatus(status: number): boolean {
		return status >= 200 && status < 300;
	}

	/**
	 * Verify response is client error (4xx status codes)
	 */
	isClientError(status: number): boolean {
		return status >= 400 && status < 500;
	}

	/**
	 * Verify response is server error (5xx status codes)
	 */
	isServerError(status: number): boolean {
		return status >= 500 && status < 600;
	}
}
