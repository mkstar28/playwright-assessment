export const FAKESTORE_AUTH = {
  valid: { username: 'johnd', password: 'm38rmF$' },
  invalid: { username: 'invalid_user', password: 'wrong_password' },
} as const;

export const CART_PRODUCT_IDS = [1, 2, 3] as const;

export function buildCartPayload(userId: number, productId: number, quantity = 1) {
  return {
    userId,
    date: new Date().toISOString(),
    products: [{ productId, quantity }],
  };
}
