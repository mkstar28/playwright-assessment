import { test, expect } from '@playwright/test';
import { assertCartSchema, getCartShape, type Cart } from '../../../helpers/fakestore/cart-schema';
import { buildCartPayload, CART_PRODUCT_IDS } from '../../fixtures/fakestore-data';

test.describe('Fake Store API — Data-Driven Cart Creation', () => {
  for (const productId of CART_PRODUCT_IDS) {
    test(`POST /carts creates cart with product ID ${productId}`, async ({ request }) => {
      const payload = buildCartPayload(3, productId, 2);

      const response = await request.post('/carts', { data: payload });

      expect(response.status()).toBe(201);

      const cart = (await response.json()) as Cart;
      assertCartSchema(cart);
      expect(cart.products[0].productId).toBe(productId);
      expect(cart.products[0].quantity).toBe(2);
    });
  }
});

test.describe('Fake Store API — Contract / Schema Test', () => {
  test('GET /carts/:id response shape matches contract snapshot', async ({ request }) => {
    const response = await request.get('/carts/2');

    expect(response.status()).toBe(200);

    const cart = (await response.json()) as Cart;
    assertCartSchema(cart);

    expect(JSON.stringify(getCartShape(cart), null, 2)).toMatchSnapshot();
  });

  test('POST /carts response shape conforms to contract snapshot', async ({ request }) => {
    const response = await request.post('/carts', {
      data: buildCartPayload(4, 7, 3),
    });

    expect(response.status()).toBe(201);

    const cart = (await response.json()) as Cart;
    assertCartSchema(cart);

    expect(JSON.stringify(getCartShape(cart), null, 2)).toMatchSnapshot();
  });
});
