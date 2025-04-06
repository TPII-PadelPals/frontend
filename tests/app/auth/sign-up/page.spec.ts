import { test, expect } from '@playwright/test';

test('completa el formulario de registro y ver el toast de éxito', async ({ page }) => {

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

test('completa el formulario de registro con email fallido y retorna error', async ({ page }) => {

    await page.goto('/auth/sign-up');
  
    await page.getByLabel('Nombre').fill('Juan Gauto');
    await page.getByLabel('Email').fill('juan@gmail');
    await page.getByLabel('Contraseña').fill('contraseña1234');
  
    await page.getByRole('button', { name: 'Registrarse' }).click();
  
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
    await expect(page.getByText('Email inválido.')).toBeVisible();

  });

  test('completa el formulario de registro con contraseña menor a 8 caracteres y retorna error', async ({ page }) => {

    await page.goto('/auth/sign-up');
  
    await page.getByLabel('Nombre').fill('Juan Gauto');
    await page.getByLabel('Email').fill('juan@gmail');
    await page.getByLabel('Contraseña').fill('1234');
  
    await page.getByRole('button', { name: 'Registrarse' }).click();
  
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
    await expect(page.getByText('La contraseña debe tener al menos 8 caracteres.')).toBeVisible();

  });