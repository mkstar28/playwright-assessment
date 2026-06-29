import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CREDENTIALS } from '../fixtures/test-data';

test.describe('Login — Negative', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
  });

  test('rejects login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', CREDENTIALS.standard.password);

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('rejects login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(CREDENTIALS.standard.username, '');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  test('rejects login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.login('invalid_user', 'wrong_password');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match',
    );
    await expect(productsPage.inventoryContainer).not.toBeVisible();
  });

  test('rejects login with correct username but wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(CREDENTIALS.standard.username, 'wrong_password');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match',
    );
  });
});
