import { useEffect, useState } from "react";
import TaskItem from "@/components/TaskItem";

import { Card } from "@/components/ui/card";

import Layout from "@/components/layout";
import TaskForm from "@/components/TaskForm";

import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

const MainPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // setTasks([exampleTask]);
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(tasks);
  }, []);

  return (
    <>
      <Layout>
        <Button
          onClick={() => {
            localStorage.removeItem("tasks");
            setTasks([]);
          }}
        >
          Clear storage
        </Button>

        <Button onClick={() => console.log(tasks)}>Get tasks</Button>

        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create a task
          </h1>
          {/* <Header /> */}

          <Card className="w-full">
            <TaskForm tasks={tasks} setTasks={setTasks} />
          </Card>

          <div className="p-4">
            <h1>Tasks</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <TaskItem task={task} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MainPage;
