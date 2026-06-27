import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CREDENTIALS } from '../fixtures/test-data';

test.describe('Login', () => {
  test('standard user can log in and land on the products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);

    await expect(productsPage.inventoryContainer).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('locked-out user sees the correct error message and is not logged in', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.lockedOut.username, CREDENTIALS.lockedOut.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
    await expect(page).toHaveURL('/');
  });
});
