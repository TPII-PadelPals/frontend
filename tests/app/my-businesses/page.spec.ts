import { test, expect } from '@playwright/test'
 
test('should navigate to my-businesses page', async ({ page }) => {
  
  await page.goto('/my-businesses')
  
  await expect(page.getByRole('heading', { name: 'Mis Establecimientos' })).toBeVisible()
})