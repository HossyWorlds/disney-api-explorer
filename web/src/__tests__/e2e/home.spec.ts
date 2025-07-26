import { test, expect } from '@playwright/test';

test.describe('Home Page E2E Tests', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if page loads without errors
    await expect(page).toHaveTitle(/Disney API Explorer/);
    
    // Check if main elements are present
    await expect(page.getByRole('heading', { name: /Disney API Explorer/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Search Disney characters/i)).toBeVisible();
  });

  test('should display character cards', async ({ page }) => {
    await page.goto('/');
    
    // Wait for character cards to load
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    // Check if character cards are displayed
    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards).toHaveCount(50); // Default page size
    
    // Check if first character card has required elements
    const firstCard = characterCards.first();
    await expect(firstCard.locator('h3')).toBeVisible(); // Character name
    await expect(firstCard.locator('img')).toBeVisible(); // Character image
  });

  test('should search for characters', async ({ page }) => {
    await page.goto('/');
    
    // Type in search box
    const searchInput = page.getByPlaceholder(/Search Disney characters/i);
    await searchInput.fill('Mickey');
    
    // Wait for search results
    await page.waitForTimeout(500); // Debounce delay
    
    // Check if search results are displayed
    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards.first()).toBeVisible();
    
    // Check if results contain Mickey
    const characterNames = await characterCards.locator('h3').allTextContents();
    expect(characterNames.some(name => name.toLowerCase().includes('mickey'))).toBeTruthy();
  });

  test('should navigate to character detail page', async ({ page }) => {
    await page.goto('/');
    
    // Wait for character cards to load
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    
    // Click on first character card
    const firstCard = page.locator('[data-testid="character-card"]').first();
    await firstCard.click();
    
    // Check if navigated to character detail page
    await expect(page).toHaveURL(/\/character\/\d+/);
    
    // Check if character details are displayed
    await expect(page.locator('h1')).toBeVisible(); // Character name
    await expect(page.locator('img')).toBeVisible(); // Character image
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('**/api.disneyapi.dev/**', route => {
      route.fulfill({ status: 500, body: 'Internal Server Error' });
    });
    
    await page.goto('/');
    
    // Check if error state is handled
    await expect(page.getByText(/error/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile layout works
    await expect(page.getByPlaceholder(/Search Disney characters/i)).toBeVisible();
    
    // Check if character cards are properly sized for mobile
    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards.first()).toBeVisible();
  });
}); 
