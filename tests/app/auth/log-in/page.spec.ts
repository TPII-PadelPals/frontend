import { test, expect } from '@playwright/test';

test('complete the registration form and it will redirect you to the owner homepage.', async ({ page }) => {

  await page.goto('/auth/log-in');

  await page.getByLabel('Email').fill('juan@gmail.com');
  await page.getByLabel('Contraseña').fill('contraseña1234');

  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  await expect(page).toHaveURL('/')
  
  // Use similar-this when log-in will be functional end-2-end
  // await expect(page).toHaveURL('/business/{business_public_id}')
});

test('complete the log-in form with failed email and it returns an error', async ({ page }) => {

    await page.goto('/auth/log-in');
  
    await page.getByLabel('Email').fill('juan@gmail');
    await page.getByLabel('Contraseña').fill('contraseña1234');
  
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  
    await expect(page.getByText('Email inválido.')).toBeVisible();

  });

  test('complete the log-in form with a password less than 8 characters and it returns an error.', async ({ page }) => {

    await page.goto('/auth/log-in');
  
    await page.getByLabel('Email').fill('juan@gmail');
    await page.getByLabel('Contraseña').fill('1234');
  
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  
    await expect(page.getByText('La contraseña debe tener al menos 8 caracteres.')).toBeVisible();

  });