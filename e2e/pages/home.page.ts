import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly generationDropdown: Locator;

  readonly typeDropdown: Locator;

  readonly typeName: Locator;

  readonly searchField: Locator;

  readonly pokemonName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.generationDropdown = page.locator('select').first();
    this.typeDropdown = page.locator('select').nth(1);
    this.typeName = page.locator('.col-span-2.-mr-5.capitalize').first();
    this.searchField = page.locator('[placeholder="🔍 Search pokémon"]');
    this.pokemonName = page.locator('.col-span-3.text-xl');
  }

  async open() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('Pokémon Awesome');
  }

  async filter(generation: string, type: string) {
    await this.generationDropdown.selectOption({ label: generation });
    await this.typeDropdown.selectOption({ label: type });
    await expect(this.typeName).toContainText(type.toLowerCase());
  }

  async search(keyword: string, pokemonName: string) {
    await this.searchField.fill(keyword);
    await expect(this.page).toHaveURL(`/?q=${keyword}`);
    await expect(this.pokemonName).toHaveText(pokemonName);
  }
}
