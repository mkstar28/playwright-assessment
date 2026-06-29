import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CHECKOUT_INFO, CREDENTIALS } from '../fixtures/test-data';

test.describe('End-to-End Shopping Flow', () => {
  test('complete journey from login to order confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
    await expect(productsPage.inventoryContainer).toBeVisible();

    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');
    await expect(productsPage.cartBadge).toHaveText('2');

    await productsPage.openCart();
    await expect(page.getByTestId('inventory-item-name')).toHaveCount(2);

    await checkoutPage.completeCheckout(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );

    await expect(checkoutPage.orderCompleteHeader).toHaveText('Thank you for your order!');
    await expect(page.getByTestId('back-to-products')).toBeVisible();
  });

  test('sort cheapest product then purchase end-to-end', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);

    const allPrices = await productsPage.getProductPrices();
    const lowestPrice = Math.min(...allPrices);

    await productsPage.sortBy('lohi');
    expect(await productsPage.getFirstProductPrice()).toBe(lowestPrice);

    await productsPage.addToCartButton('sauce-labs-onesie').click();
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.openCart();
    await checkoutPage.completeCheckout(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );

    await expect(checkoutPage.orderCompleteHeader).toBeVisible();
  });
});
