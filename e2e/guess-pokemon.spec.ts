import { expect, test } from '@playwright/test';

test('Guess the Pokemon', async ({ page }) => {
  // Go to Guess the Pokemon Page
  await page.goto('http://localhost:3000/guess-pokemon');
  await expect(page).toHaveTitle("Who's That Pokémon? | Pokémon Awesome");
  await expect(page.locator('text="Who\'s That Pokémon?"')).toBeVisible();

  await page.evaluate('Math.random = () => 0.0001');
  await page.locator('text=Easy >> input[name="level"]').check();

  await page.keyboard.type('bulbasaur');
  await page.keyboard.press('Enter');

  const resultContent = await page
    .locator('.relative.flex.justify-center.text-center')
    .textContent();

  expect(resultContent).toMatch(/Correct, that was Bulbasaur/);
});
