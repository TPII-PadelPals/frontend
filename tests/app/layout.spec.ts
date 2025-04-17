import { test, expect } from '@playwright/test'
 
test('should navigate to the sign-up page', async ({ page }) => {
  
  await page.goto('/')
  
  await page.getByRole('link', { name: 'Registrarse' }).click();
  
  await expect(page).toHaveURL('/auth/sign-up')
  
  await expect(page.getByLabel('Nombre')).toBeVisible()
})

test('should navigate to the log-in page', async ({ page }) => {
  
    await page.goto('/')
    
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    
    await expect(page).toHaveURL('/auth/log-in')
    
    await expect(page.getByLabel('Email')).toBeVisible()
  })