import supabase from "@/lib/supabase";

export interface Task {
  id?: number;
  title: string;
  status: 'pending' | 'completed';
  created_at?: string;
  user_id?: string;
  is_synced?: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('task')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }

  return data || [];
};

export const insertTask = async (task: Omit<Task, 'id'>): Promise<Task | null> => {
  const { data, error } = await supabase
    .from('task')
    .insert(task)
    .select()
    .single();

  if (error) {
    console.error('Error inserting task:', error);
    return null;
  }

  return data;
};

export const updateTask = async (task: Task): Promise<Task | null> => {
  const { data, error } = await supabase
    .from('tasks')
    .update(task)
    .eq('id', task.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating task:', error);
    return null;
  }

  return data;
};