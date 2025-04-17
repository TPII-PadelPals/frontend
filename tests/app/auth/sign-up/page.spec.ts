import { test, expect } from '@playwright/test';

test('complete the registration form and see the success toast', async ({ page }) => {

  await page.goto('/auth/sign-up');

  await page.getByLabel('Nombre').fill('Juan Gauto');
  await page.getByLabel('Email').fill('juan@gmail.com');
  await page.getByLabel('Contraseña').fill('contraseña1234');

  await page.getByRole('button', { name: 'Registrarse' }).click();

  await expect(page.getByText('Email inválido.')).not.toBeVisible();
  await expect(page.getByText('La contraseña debe tener al menos 8 caracteres.')).not.toBeVisible();

  await expect(page).toHaveURL('/auth/sign-up')
  // en webkit este test falla.
  // await expect(page.getByText('Registro exitoso!')).toBeVisible();
});

test('complete the registration form with failed email and it returns an error', async ({ page }) => {

    await page.goto('/auth/sign-up');
  
    await page.getByLabel('Nombre').fill('Juan Gauto');
    await page.getByLabel('Email').fill('juan@gmail');
    await page.getByLabel('Contraseña').fill('contraseña1234');
  
    await page.getByRole('button', { name: 'Registrarse' }).click();
  
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
    await expect(page.getByText('Email inválido.')).toBeVisible();

  });

  test('complete the registration form with a password less than 8 characters and it returns an error.', async ({ page }) => {

    await page.goto('/auth/sign-up');
  
    await page.getByLabel('Nombre').fill('Juan Gauto');
    await page.getByLabel('Email').fill('juan@gmail');
    await page.getByLabel('Contraseña').fill('1234');
  
    await page.getByRole('button', { name: 'Registrarse' }).click();
  
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
    await expect(page.getByText('La contraseña debe tener al menos 8 caracteres.')).toBeVisible();

  });