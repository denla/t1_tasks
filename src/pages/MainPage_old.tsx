import { useEffect, useState } from "react";
import TaskItem from "@/components/TaskItem";
// import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import SelectField from "@/components/SelectField";
// import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

import Layout from "@/components/layout";

const exampleTask = {
  id: "1",
  title: "Фикс багов в форме входа",
  description: "Ошибка появляется при неверном пароле",
  category: "Bug",
  status: "In Progress",
  priority: "High",
};
type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

const categories = [
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Test",
] as const;

const statuses = ["To Do", "In Progress", "Done"] as const;
const priorities = ["Low", "Medium", "High"] as const;

const MainPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // setTasks([exampleTask]);
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(tasks);
  }, []);

  const addTask = (e, newTask) => {
    e.preventDefault();
    if (
      newTask.title &&
      newTask.category &&
      newTask.status &&
      newTask.priority
    ) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      clearForm();
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setStatus("");
    setPriority("");
  };

  const getNewId = () => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map((task) => Number(task.id))) + 1;
  };

  return (
    <>
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create a task
          </h1>
          {/* <Header /> */}

          <Card className="w-full">
            <CardContent className="space-y-4 gap-20">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <SelectField
                    label="Категория"
                    value={category}
                    onValueChange={setCategory}
                    options={categories}
                  />
                </div>

                <div>
                  <SelectField
                    label="Статус"
                    value={status}
                    onValueChange={setStatus}
                    options={statuses}
                  />
                </div>

                <div>
                  <SelectField
                    label="Приоритет"
                    value={priority}
                    onValueChange={setPriority}
                    options={priorities}
                  />
                </div>
              </div>

              <Button
                onClick={(e) => {
                  const newTask = {
                    id: getNewId(),
                    title,
                    description: description || "Без описания",
                    category,
                    status,
                    priority,
                  };
                  addTask(e, newTask);
                }}
              >
                Save
              </Button>
            </CardContent>
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
