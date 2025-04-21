import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useMutationAddTask } from './useTask';

describe('useMutationAddTask', () => {
  it('should add a task', async () => {
    const { result } = renderHook(() => useMutationAddTask());
    await act(async () => {
      await result.current.mutateAsync({ title: 'Task', status: 'pending' });
    });
    expect(result.current.isSuccess).toBe(true);
  });
});