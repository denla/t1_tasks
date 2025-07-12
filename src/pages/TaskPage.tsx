import TaskForm from "@/components/TaskForm";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [currentTask, setCurrentTask] = useState<Task>();
  useEffect(() => {
    const store = localStorage.getItem("tasks");
    const parsed = JSON.parse(store || "[]");
    setTasks(parsed);
  }, []);

  // useEffect(() => {
  //   console.log("tasks updated:", tasks);
  // }, [tasks]);

  return <TaskForm tasks={tasks} setTasks={setTasks} />;
};

export default TaskPage;
