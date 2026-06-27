import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CREDENTIALS } from '../fixtures/test-data';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  });

  test('adding two products updates the cart badge to 2', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');

    await expect(productsPage.cartBadge).toHaveText('2');
  });

  test('sorting by price low to high displays the lowest-priced product first', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const allPrices = await productsPage.getProductPrices();
    const lowestPrice = Math.min(...allPrices);

    await productsPage.sortBy('lohi');

    const firstPrice = await productsPage.getFirstProductPrice();
    expect(firstPrice).toBe(lowestPrice);
  });
});
