import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('GET request - fetch user data', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  test('POST request - create new resource', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Playwright',
      userId: 1,
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost,
    });

    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
  });

  test('PUT request - update resource', async ({ request }) => {
    const updatedData = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body',
      userId: 1,
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: updatedData,
    });

    expect(response.status()).toBe(200);
    const updatedPost = await response.json();
    expect(updatedPost.title).toBe(updatedData.title);
  });

  test('DELETE request', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
  });

  test('Response validation - headers and status', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  test('Error handling - 404 Not Found', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/99999');
    
    expect(response.status()).toBe(404);
  });

  test('Authenticated request - with headers', async ({ request }) => {
    // Primer sa custom headers (npr. Authorization token)
    const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
      headers: {
        'Authorization': 'Bearer token123',
        'Custom-Header': 'custom-value',
      },
    });

    expect(response.status()).toBe(200);
  });
});

