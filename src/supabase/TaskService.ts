import supabase from "@/lib/supabase";

const VITE_ENV = import.meta.env.VITE_ENV;
const tableName = VITE_ENV == 'development' ? "task_list_test" : "task_list";

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }

  return data;
};

export const insertTask = async (task: TaskEntry): Promise<Task | null> => {
  const { data, error } = await supabase
    .from(tableName)
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
    .from(tableName)
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