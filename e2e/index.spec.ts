import { test } from '@playwright/test';

import { ComparePage } from './pages/compare.page';
import { HomePage } from './pages/home.page';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  // Open Homepage
  await homePage.open();
});

test('filter pokemon', async ({ page }) => {
  const homePage = new HomePage(page);
  // Filter Pokemon: Generation 4 & Type Water
  await homePage.filter('Generation IV', 'Water');
  // Filter Pokemon: Generation 1 & Type Poison
  await homePage.filter('Generation I', 'Poison');
  // Filter Pokemon: Generation 8 & Type Fire
  await homePage.filter('Generation VIII', 'Fire');
});

test('search pokemon', async ({ page }) => {
  const homePage = new HomePage(page);
  // Search Pokemon: pika
  await homePage.search('pika', 'Pikachu');
  // Search Pokemon: sinis
  await homePage.search('sinis', 'Sinistea');
  // Search Pokemon: budew
  await homePage.search('budew', 'Budew');
});

test('compare pokemon', async ({ page }) => {
  const compagePage = new ComparePage(page);
  // Compare Pokemon: Pikachu vs Squirtle
  await compagePage.open();
  await compagePage.compare('Pikachu', 'Squirtle');
});
