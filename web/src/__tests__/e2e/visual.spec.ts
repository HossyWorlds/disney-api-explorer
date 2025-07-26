import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('home page should match visual baseline', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    // Take screenshot of the entire page
    await expect(page).toHaveScreenshot('home-page.png');
  });

  test('character detail page should match visual baseline', async ({ page }) => {
    await page.goto('/character/1');
    
    // Wait for page to load completely
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Take screenshot of the entire page
    await expect(page).toHaveScreenshot('character-detail-page.png');
  });

  test('mobile layout should match visual baseline', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    // Take screenshot of mobile layout
    await expect(page).toHaveScreenshot('home-page-mobile.png');
  });

  test('search results should match visual baseline', async ({ page }) => {
    await page.goto('/');
    
    // Type in search box
    const searchInput = page.getByPlaceholder(/Search Disney characters/i);
    await searchInput.fill('Mickey');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Take screenshot of search results
    await expect(page).toHaveScreenshot('search-results.png');
  });
}); 
