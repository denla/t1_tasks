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

  const removeItems = () => {
    localStorage.removeItem("tasks");
    setTasks([]);
  };

  return (
    <>
      <Layout>
        <h1 className="text-2xl font-semibold mb-[16px]">Create a task</h1>
        <TaskForm tasks={tasks} setTasks={setTasks} />

        <div>
          <div className="flex items-center gap-2 justify-between mt-[32px] mb-[16px]">
            <h1 className="text-2xl font-semibold ">Tasks</h1>
            {tasks.length > 0 && (
              <Button onClick={removeItems} variant="outline">
                Clear all
              </Button>
            )}
          </div>

          {tasks.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <TaskItem task={task} />
              ))}
            </div>
          ) : (
            <div className="p-20 w-[100%] flex justify-center">
              Nothing found. Please create a task.
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default MainPage;
