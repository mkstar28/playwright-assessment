import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.productPrices = page.getByTestId('inventory-item-price');
  }

  addToCartButton(productSlug: string): Locator {
    return this.page.getByTestId(`add-to-cart-${productSlug}`);
  }

  async addProductToCart(productSlug: string) {
    await this.addToCartButton(productSlug).click();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async sortBy(option: 'lohi' | 'hilo' | 'az' | 'za') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map((price) => parseFloat(price.replace('$', '')));
  }

  async getFirstProductPrice(): Promise<number> {
    const firstPrice = await this.productPrices.first().textContent();
    return parseFloat(firstPrice!.replace('$', ''));
  }
}
