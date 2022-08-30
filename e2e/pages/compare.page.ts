import { expect, Locator, Page } from '@playwright/test';

export class ComparePage {
  readonly page: Page;

  readonly headerName: Locator;

  readonly searchBar: Locator;

  readonly searchResult: Locator;

  readonly compareHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerName = page.locator('.h1.pb-6');
    this.searchBar = page.locator('.w-full.rounded-md.border.py-2.px-3.text-typography-light');
    this.searchResult = page
      .locator('.relative.cursor-default.select-none.truncate.py-2.px-4')
      .first();
    this.compareHeader = page.locator("h1[class='h1 pb-5 xl:pr-16']");
  }

  async open() {
    await this.page.goto('/compare');
    await expect(this.page).toHaveTitle('Compare Pokémons | Pokémon Awesome');
    await expect(this.headerName).toHaveText('Compare Pokémons');
  }

  async compare(firstPokemon: string, secondPokemon: string) {
    await this.searchBar.fill(firstPokemon);
    await this.searchResult.click();
    await this.searchBar.fill(secondPokemon);
    await this.searchResult.click();
    await expect(this.compareHeader).toHaveText(`${firstPokemon} vs ${secondPokemon}`);
  }
}
