type TaskStatus = "pending" | "completed";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  created_at: string;
}

type TaskEntry =  Omit<Task, "id" | "created_at">;
