import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CHECKOUT_INFO, CREDENTIALS } from '../fixtures/test-data';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');
    await productsPage.openCart();
  });

  test('completing checkout shows the thank-you confirmation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.completeCheckout(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );

    await expect(checkoutPage.orderCompleteHeader).toBeVisible();
    await expect(checkoutPage.orderCompleteHeader).toHaveText('Thank you for your order!');
  });
});
