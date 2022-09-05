import { expect, test } from '@playwright/test';

test('Pokemon evolutions', async ({ page }) => {
  // Go to Homepage
  await page.goto('http://localhost:3000/');

  // Click "Evolutions" menu on navigation
  await page.locator('text=Evolutions').click();
  await expect(page).toHaveURL('http://localhost:3000/evolutions');
  await expect(page).toHaveTitle('Pokémon Evolutions | Pokémon Awesome');
  await expect(page.locator('text="Bulbasaur"')).toBeVisible();
  await expect(page.locator('text="Ivysaur"')).toBeVisible();
  await expect(page.locator('text="Venusaur"')).toBeVisible();

  // Filter evolutions: generation II
  await page.locator('select').first().selectOption('2');
  await expect(page).toHaveURL('http://localhost:3000/evolutions?gen=2');

  // Filter pokemons: type electric
  await page.locator('select').nth(1).selectOption('electric');
  await expect(page).toHaveURL('http://localhost:3000/evolutions?gen=2&type=electric');

  await expect(page.locator('text="Bulbasaur"')).toBeHidden();

  // Click Electabuzz image
  await page.locator('img[alt="electabuzz"]').click();
  await expect(page).toHaveURL('http://localhost:3000/pokemon/electabuzz');

  // Click Elekid image
  await page.locator('text=Elekid').click();
  await expect(page).toHaveURL('http://localhost:3000/pokemon/elekid');
});
