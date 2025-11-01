/**
 * Interface definitions for API testing
 */

export interface User {
	id: number;
	name: string;
	email: string;
	username?: string;
	phone?: string;
	website?: string;
}

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}
