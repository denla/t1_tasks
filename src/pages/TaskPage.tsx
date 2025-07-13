import TaskForm from "@/components/TaskForm";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  return (
    <Layout>
      <Link to="/">
        <Button variant="outline">Back</Button>
      </Link>
      <h1 className="text-2xl font-semibold mt-[16px] mb-[16px]">Edit task</h1>
      <TaskForm tasks={tasks} setTasks={setTasks} />
    </Layout>
  );
};

export default TaskPage;
