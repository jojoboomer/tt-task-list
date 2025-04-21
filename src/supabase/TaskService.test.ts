import { describe, expect, it } from 'vitest';
import * as TaskService from './TaskService';

describe('TaskService', () => {
    
  it('should fetch tasks', async () => {
    // Mock supabase client or use a test database
    const tasks = await TaskService.fetchTasks();
    expect(Array.isArray(tasks)).toBe(true); 
  });

//   it('should insert a task', async () => {
//     const newTask = { title: 'Test', status: 'pending' };
//     const result = await TaskService.insertTask(newTask);
//     expect(result).toHaveProperty('id');
//   });

  // Agrega tests para updateTask y deleteTask
});