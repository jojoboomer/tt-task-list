import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:5173'



test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('should cancel creating a task', async ({ page }) => {
  await page.getByText('Type to add new task').click();
  await page.getByTestId('editable-div').fill('Task to cancel');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByText('Task to cancel')).not.toBeVisible();
});

test.describe('Create task', () => {
  test('should create task', async ({ page }) => {
    await expect(page).toHaveTitle(/Task List/);
    
    await page.getByText('Type to add new task').click();
    await page.getByRole('button', { name: 'Normal' }).isDisabled();
    await page.getByRole('button', { name: 'Ok' }).isEnabled();
    await page.getByTestId('editable-div').click()
    await page.getByTestId('editable-div').fill('New #task');
    
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('New #task')).toBeVisible();

    await page.getByText('New #task').click();
    await page.getByTestId('editable-div').click();
    await page.getByTestId('editable-div').fill('New #task updated');
    await page.getByRole('button', { name: /save/i }).click();
    await expect(page.getByText('New #task updated')).toBeVisible();
  });
});
