import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/SelectField";

import { Card, CardContent } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

const categories = ["Bug", "Feature", "Documentation", "Refactor", "Test"];
const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["Low", "Medium", "High"];

type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

type TaskFormProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskForm = ({ tasks, setTasks }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && tasks.length > 0) {
      const task = tasks.find((task) => task.id == id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description || "");
        setCategory(task.category);
        setStatus(task.status);
        setPriority(task.priority);
      }
      // console.log("TASK FORM UPDATE");
      console.log(task);
    }
  }, [id, tasks]);

  const getNewId = () => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map((task) => Number(task.id))) + 1;
  };

  const addTask = (newTask: any) => {
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

  const editTask = (newTask: any) => {
    const updatedTasks = tasks.map((task: any) => {
      console.log("task.id", task.id, "newTask.id", newTask.id);
      if (task.id == newTask.id) {
        return newTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setStatus("");
    setPriority("");
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
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
          <SelectField
            label="Category"
            value={category}
            onValueChange={setCategory}
            options={categories}
          />
          <SelectField
            label="Status"
            value={status}
            onValueChange={setStatus}
            options={statuses}
          />

          <SelectField
            label="Priority"
            value={priority}
            onValueChange={setPriority}
            options={priorities}
          />
        </div>

        <Button
          onClick={(e) => {
            e.preventDefault();
            const newTask = {
              id: id ? id : getNewId(),
              title,
              description: description,
              category,
              status,
              priority,
            };
            id ? editTask(newTask) : addTask(newTask);
          }}
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
