type TaskStatus = "pending" | "completed";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  created_at: string;
}