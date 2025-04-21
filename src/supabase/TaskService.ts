import supabase from "@/lib/supabase";

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('task_list')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }

  return data;
};

export const insertTask = async (task: Omit<Task, 'id'>): Promise<Task | null> => {
  const { data, error } = await supabase
    .from('task_list')
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
    .from('task_list')
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