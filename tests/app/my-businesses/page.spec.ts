import { test, expect } from '@playwright/test'
 
test('should navigate to my-businesses page', async ({ page }) => {
  
  await page.goto('/my-businesses')
  
  await expect(page.getByRole('heading', { name: 'Mis Establecimientos' })).toBeVisible()

  await expect(page.getByRole('button', { name: '+ Crear Establecimiento' })).toBeVisible();
})

test('should complete the create business form and it will get sucess mesagge', async ({ page }) => {

  await page.goto('/my-businesses');

  await page.getByRole('button', { name: '+ Crear Establecimiento' }).click()

  await page.getByLabel('Nombre').fill('Padel Sports');
  await page.getByLabel('Dirección').fill('Paseo Colon 850');

  await page.getByRole('button', { name: 'Crear Establecimiento' }).click()

  await expect(page.getByRole('dialog')).toBeHidden();

  await expect(page.getByText('Establecimiento Creado.', { exact: true })).toBeVisible();
});

test('complete the create business form with short Name then will get error mesagge', async ({ page }) => {

  await page.goto('/my-businesses');

  await page.getByRole('button', { name: '+ Crear Establecimiento' }).click()

  await page.getByLabel('Nombre').fill('Fi');
  await page.getByLabel('Dirección').fill('Paseo Colon 850');

  await page.getByRole('button', { name: 'Crear Establecimiento' }).click()

  await expect(page.getByText('El mínimo de caracteres es 3.')).toBeVisible();
});

test('should be cancel the create business form and back to my-businesses page', async ({ page }) => {

  await page.goto('/my-businesses');

  await page.getByRole('button', { name: '+ Crear Establecimiento' }).click()

  await page.getByLabel('Nombre').fill('Padel Sports');
  await page.getByLabel('Dirección').fill('Paseo Colon 850');

  await page.getByRole('button', { name: 'Cancelar' }).click()

  await expect(page.getByRole('dialog')).toBeHidden();

  await expect(page.getByRole('heading', {name: 'Mis Establecimientos'})).toBeVisible()
});