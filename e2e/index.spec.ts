import { expect, test } from '@playwright/test';

test('Pokemon list, filter & search', async ({ page }) => {
  // Go to Homepage
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Pokémon Awesome');

  // Filter pokemons: generation 1
  await page.locator('select').first().selectOption('1');
  await expect(page).toHaveURL('http://localhost:3000/?gen=1');
  await expect(page.locator('text="Bulbasaur"')).toBeVisible();

  // Search "pika"
  await page.locator('[placeholder="🔍 Search pokémon"]').click();
  await page.locator('[placeholder="🔍 Search pokémon"]').fill('pika');
  await expect(page).toHaveURL('http://localhost:3000/?q=pika&gen=1');
  await expect(page.locator('text="Bulbasaur"')).toBeHidden();

  // Click Pikachu card
  await page.locator('text=PikachuType:electric025').click();
  await expect(page).toHaveURL('http://localhost:3000/pokemon/pikachu');
});

test('Pokemon detail & compare pokemon', async ({ page }) => {
  // Go to Pikachu detail page
  await page.goto('http://localhost:3000/pokemon/pikachu');
  await expect(page).toHaveTitle('Pikachu #025 | Pokémon Awesome');

  const mainCardContent = await page.locator('#_pokemon-detail-main-card').textContent();
  expect(mainCardContent).toMatch(/(electric)/i);
  expect(mainCardContent).toMatch(/(0.4 m)/i);
  expect(mainCardContent).toMatch(/(6 kg)/i);

  // From Pikachu detail page, compare with Squirtle
  await page.locator('[placeholder="🔍 Search Pokemon to be compared"]').click();
  await page.locator('[placeholder="🔍 Search Pokemon to be compared"]').fill('squ');
  await page.locator('text=Squirtle').click();

  // Redirected to Pokemon comparison page
  await expect(page).toHaveURL('http://localhost:3000/compare?pokemons=pikachu,squirtle');
  await expect(page.locator('text="Pikachu vs Squirtle"')).toBeVisible();

  // Add Charmander to the comparison
  await page.locator('[placeholder="🔍 Add more pokemon to the comparison"]').click();
  await page.locator('[placeholder="🔍 Add more pokemon to the comparison"]').fill('cha');
  await page.locator('text=Charmander').click();
  await expect(page).toHaveURL(
    'http://localhost:3000/compare?pokemons=pikachu,squirtle,charmander',
  );
  await expect(page.locator('text="Pikachu vs Squirtle vs Charmander"')).toBeVisible();

  // Remove Squirtle from the comparison
  await page
    .locator(
      'text=#007waterType0.5 mHeight9 kgWeightBase StatsHP44Attack48Defense65Sp. Attack50Sp. >> button',
    )
    .click();
  await expect(page).toHaveURL('http://localhost:3000/compare?pokemons=pikachu,charmander');
  await expect(page.locator('text="Pikachu vs Charmander"')).toBeVisible();

  // See Charmander detail from pokemon comparison page
  await page.locator('text=Details →').nth(1).click();
  await expect(page).toHaveURL('http://localhost:3000/pokemon/charmander');
});
