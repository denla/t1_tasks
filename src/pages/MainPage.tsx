import { useEffect, useState } from "react";
import TaskItem from "@/components/TaskItem";
// import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
    setTasks([exampleTask]);
  }, []);

  const addTask = (e, newTask) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
  };

  const getNewId = () => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map((task) => Number(task.id))) + 1;
  };

  return (
    <>
      <Layout>
        <div className="form">
          <form>
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
                <Label>Категория</Label>
                <Select
                  value={category}
                  onValueChange={(val) => setCategory(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Статус</Label>
                <Select value={status} onValueChange={(val) => setStatus(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Приоритет</Label>
                <Select
                  value={priority}
                  onValueChange={(val) => setPriority(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={(e) => {
                const newTask = {
                  id: getNewId(),
                  title,
                  description,
                  category,
                  status,
                  priority,
                };
                // e.preventDefault();
                // console.log(newTask);
                addTask(e, newTask);
              }}
            >
              Save
            </Button>
          </form>
        </div>

        <div className="p-4">
          <h1>Tasks</h1>
          {/* <Sidebar /> */}
          {/* <TaskItem task={exampleTask} /> */}
          {tasks.map((task) => (
            <TaskItem task={task} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default MainPage;
