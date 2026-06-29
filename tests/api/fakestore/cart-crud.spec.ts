import { test, expect } from '@playwright/test';
import { assertCartSchema, type Cart } from '../../../helpers/fakestore/cart-schema';
import { buildCartPayload } from '../../fixtures/fakestore-data';

test.describe('Fake Store API — Cart CRUD (Positive)', () => {
  test('GET /carts/:id returns cart with valid schema', async ({ request }) => {
    const response = await request.get('/carts/1');

    expect(response.status()).toBe(200);

    const cart = (await response.json()) as Cart;
    assertCartSchema(cart);
    expect(cart.id).toBe(1);
  });

  test('POST /carts creates a new cart', async ({ request }) => {
    const payload = buildCartPayload(5, 4, 2);

    const response = await request.post('/carts', { data: payload });

    expect(response.status()).toBe(201);

    const cart = (await response.json()) as Cart;
    assertCartSchema(cart);
    expect(cart.userId).toBe(payload.userId);
    expect(cart.products[0].productId).toBe(4);
    expect(cart.products[0].quantity).toBe(2);
  });

  test('PUT /carts/:id updates an existing cart', async ({ request }) => {
    const createResponse = await request.post('/carts', {
      data: buildCartPayload(2, 1, 1),
    });
    const created = (await createResponse.json()) as Cart;

    const updatedPayload = buildCartPayload(2, 6, 5);
    const response = await request.put(`/carts/${created.id}`, { data: updatedPayload });

    expect(response.status()).toBe(200);

    const cart = (await response.json()) as Cart;
    assertCartSchema(cart);
    expect(cart.id).toBe(created.id);
    expect(cart.products[0].productId).toBe(6);
    expect(cart.products[0].quantity).toBe(5);
  });

  test('DELETE /carts/:id removes a cart', async ({ request }) => {
    const createResponse = await request.post('/carts', {
      data: buildCartPayload(2, 3, 1),
    });
    const created = (await createResponse.json()) as Cart;

    const deleteResponse = await request.delete(`/carts/${created.id}`);
    expect(deleteResponse.status()).toBe(200);
  });
});

test.describe('Fake Store API — Cart CRUD (Negative)', () => {
  test('GET /carts/:id returns null for non-existent cart', async ({ request }) => {
    const response = await request.get('/carts/999999');

    expect(response.status()).toBe(200);
    expect(await response.text()).toBe('null');
  });

  test('GET /carts/:id returns 400 for invalid cart id format', async ({ request }) => {
    const response = await request.get('/carts/invalid-id');

    expect(response.status()).toBe(400);

    const body = (await response.json()) as { status: string; message: string };
    expect(body.status).toBe('error');
    expect(body.message).toContain('cart id');
  });

  test('POST /carts rejects malformed JSON body', async ({ request }) => {
    const response = await request.post('/carts', {
      headers: { 'Content-Type': 'application/json' },
      data: 'not-valid-json',
    });

    expect(response.status()).toBe(400);
  });

  test('PUT /carts/:id returns 400 for invalid cart id format', async ({ request }) => {
    const response = await request.put('/carts/not-a-number', {
      data: buildCartPayload(1, 1, 1),
    });

    expect(response.status()).toBe(400);
  });

  test('DELETE /carts/:id returns 400 for invalid cart id format', async ({ request }) => {
    const response = await request.delete('/carts/not-a-number');

    expect(response.status()).toBe(400);
  });
});
