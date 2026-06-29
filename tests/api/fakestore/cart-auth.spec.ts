import { test, expect } from '@playwright/test';
import { FAKESTORE_AUTH } from '../../fixtures/fakestore-data';
import { getAuthToken } from '../../../helpers/fakestore/auth-helper';

test.describe('Fake Store API — Authentication', () => {
  test('POST /auth/login returns token for valid credentials', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: FAKESTORE_AUTH.valid,
    });

    expect([200, 201]).toContain(response.status());

    const body = (await response.json()) as { token: string };
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
    expect(body.token.split('.')).toHaveLength(3);
  });

  test('POST /auth/login rejects invalid credentials', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: FAKESTORE_AUTH.invalid,
    });

    expect(response.status()).toBe(401);
  });

  test('POST /auth/login rejects empty username', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: '', password: FAKESTORE_AUTH.valid.password },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('POST /auth/login rejects empty credentials body', async ({ request }) => {
    const response = await request.post('/auth/login', { data: {} });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('authenticated request can create cart with bearer token', async ({ request }) => {
    const token = await getAuthToken(request);

    const response = await request.post('/carts', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId: 1,
        date: new Date().toISOString(),
        products: [{ productId: 1, quantity: 1 }],
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
  });
});
