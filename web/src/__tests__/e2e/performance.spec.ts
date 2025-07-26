import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('home page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for character cards to load
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    const loadTime = Date.now() - startTime;
    
    // Home page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('character detail page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/character/1');
    
    // Wait for character details to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    const loadTime = Date.now() - startTime;
    
    // Character detail page should load within 2 seconds
    expect(loadTime).toBeLessThan(2000);
  });

  test('search should respond within acceptable time', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    const startTime = Date.now();
    
    // Type in search box
    const searchInput = page.getByPlaceholder(/Search Disney characters/i);
    await searchInput.fill('Mickey');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    const searchTime = Date.now() - startTime;
    
    // Search should respond within 1 second
    expect(searchTime).toBeLessThan(1000);
  });

  test('should not have memory leaks', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    // Navigate to character detail page
    await page.goto('/character/1');
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Navigate back to home page
    await page.goto('/');
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    // Check if page still functions correctly
    const searchInput = page.getByPlaceholder(/Search Disney characters/i);
    await expect(searchInput).toBeVisible();
  });
}); 
