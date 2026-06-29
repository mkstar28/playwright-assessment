import { expect } from '@playwright/test';

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

export function assertCartSchema(cart: Cart): void {
  expect(cart).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      userId: expect.any(Number),
      date: expect.any(String),
      products: expect.any(Array),
    }),
  );

  expect(cart.products.length).toBeGreaterThan(0);

  for (const item of cart.products) {
    expect(item).toEqual(
      expect.objectContaining({
        productId: expect.any(Number),
        quantity: expect.any(Number),
      }),
    );
    expect(item.quantity).toBeGreaterThan(0);
  }

  expect(Date.parse(cart.date)).not.toBeNaN();
}

export function getCartShape(cart: Cart): Record<string, unknown> {
  return {
    keys: Object.keys(cart).sort(),
    productItemKeys: Object.keys(cart.products[0] ?? {}).sort(),
    productCount: cart.products.length,
  };
}
