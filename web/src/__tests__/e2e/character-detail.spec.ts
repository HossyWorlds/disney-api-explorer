import { test, expect } from '@playwright/test';

test.describe('Character Detail Page E2E Tests', () => {
  test('should load character detail page', async ({ page }) => {
    await page.goto('/character/1');
    
    // Check if page loads without errors
    await expect(page).toHaveTitle(/Disney API Explorer/);
    
    // Check if character details are displayed
    await expect(page.locator('h1')).toBeVisible(); // Character name
    await expect(page.locator('img')).toBeVisible(); // Character image
  });

  test('should display character information sections', async ({ page }) => {
    await page.goto('/character/1');
    
    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Check if all information sections are present
    await expect(page.getByText(/Films/i)).toBeVisible();
    await expect(page.getByText(/TV Shows/i)).toBeVisible();
    await expect(page.getByText(/Video Games/i)).toBeVisible();
    await expect(page.getByText(/Park Attractions/i)).toBeVisible();
    await expect(page.getByText(/Allies/i)).toBeVisible();
    await expect(page.getByText(/Enemies/i)).toBeVisible();
  });

  test('should navigate back to home page', async ({ page }) => {
    await page.goto('/character/1');
    
    // Click back button or breadcrumb
    await page.getByRole('link', { name: /home/i }).click();
    
    // Check if navigated back to home page
    await expect(page).toHaveURL('/');
  });

  test('should handle non-existent character gracefully', async ({ page }) => {
    await page.goto('/character/999999');
    
    // Check if error state is handled
    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/character/1');
    
    // Check if mobile layout works
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('img')).toBeVisible();
  });
}); 
