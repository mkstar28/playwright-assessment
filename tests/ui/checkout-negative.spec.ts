import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CREDENTIALS } from '../fixtures/test-data';

test.describe('Checkout — Negative', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.openCart();
    await new CheckoutPage(page).startCheckout();
  });

  test('shows error when first name is missing', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillShippingInfo('', 'Doe', '12345');
    await checkoutPage.continueToOverview();

    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('shows error when last name is missing', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillShippingInfo('John', '', '12345');
    await checkoutPage.continueToOverview();

    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('Last Name is required');
  });

  test('shows error when postal code is missing', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillShippingInfo('John', 'Doe', '');
    await checkoutPage.continueToOverview();

    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('Postal Code is required');
  });
});
