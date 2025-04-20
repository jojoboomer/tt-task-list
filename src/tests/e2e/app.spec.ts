import { expect, Page, test } from '@playwright/test';

const BASE_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
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
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

//   test('should update a task', async ({ page }) => {
//     await page.getByText('New #task').click();
//     await page.getByTestId('editable-div').click()
//     await page.getByTestId('editable-div').fill('New #task updated');
//     await page.getByRole('button', { name: 'Save' }).click();
//     await checkNumberOfTodosInLocalStorage(page, 1);
//   });
});

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['tasklist-storage']).state.taskList.length === e;
  }, expected);
}