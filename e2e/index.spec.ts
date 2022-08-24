import { expect, test } from '@playwright/test';

test('should do things correctly', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Filter pokemons: generation 1
  await page.locator('select').first().selectOption('1');
  await expect(page).toHaveURL('http://localhost:3000/?gen=1');

  // Search "pika"
  await page.locator('[placeholder="🔍 Search pokémon"]').click();
  await page.locator('[placeholder="🔍 Search pokémon"]').fill('pika');
  await expect(page).toHaveURL('http://localhost:3000/?q=pika&gen=1');

  // Click Pikachu card
  await page.locator('text=PikachuType:electric025').click();
  await expect(page).toHaveURL('http://localhost:3000/pokemon/pikachu');

  // Compare with Squirtle
  await page.locator('[placeholder="🔍 Search Pokemon to be compared"]').click();
  await page.locator('[placeholder="🔍 Search Pokemon to be compared"]').fill('squ');
  await page.locator('text=Squirtle').click();
  await expect(page).toHaveURL('http://localhost:3000/compare?pokemons=pikachu,squirtle');

  // Add Charmander to the comparison
  await page.locator('[placeholder="🔍 Add more pokemon to the comparison"]').click();
  await page.locator('[placeholder="🔍 Add more pokemon to the comparison"]').fill('cha');
  await page.locator('text=Charmander').click();
  await expect(page).toHaveURL(
    'http://localhost:3000/compare?pokemons=pikachu,squirtle,charmander',
  );

  // Remove Squirtle from the comparison
  await page
    .locator(
      'text=#007waterType0.5 mHeight9 kgWeightBase StatsHP44Attack48Defense65Sp. Attack50Sp. >> button',
    )
    .click();
  await expect(page).toHaveURL('http://localhost:3000/compare?pokemons=pikachu,charmander');

  // See Charmander detail from pokemon comparison page
  await page.locator('text=Details →').nth(1).click();
  await expect(page).toHaveURL('http://localhost:3000/pokemon/charmander');
});
