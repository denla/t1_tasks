import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Input } from "@/shared/ui/shadcn/input";
import { Textarea } from "@/shared/ui/shadcn/textarea";
import { Button } from "@/shared/ui/shadcn/button";
import SelectField from "@/shared/ui/select/SelectField";

import { observer } from "mobx-react-lite";
import { taskStore } from "@/entities/task/model/taskStore";
import type { Task } from "@/entities/task/model/taskStore";

const categories = ["Bug", "Feature", "Documentation", "Refactor", "Test"];
const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["Low", "Medium", "High"];

interface TaskFormProps {
  onSave?: () => void;
}

const TaskForm = ({ onSave }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && taskStore.tasks.length > 0) {
      const task = taskStore.tasks.find((task) => task.id === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description || "");
        setCategory(task.category);
        setStatus(task.currentStatus);
        setPriority(task.priority);
      }
    }
  }, [id]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setStatus("");
    setPriority("");
  };

  const handleSave = () => {
    if (!title || !category || !status || !priority) return;

    const baseTask = {
      title,
      description,
      category: category as Task["category"],
      currentStatus: status as Task["currentStatus"],
      priority: priority as Task["priority"],
    };

    if (id) {
      const updatedTask: Task = {
        id,
        ...baseTask,
      };
      taskStore.updateTask(updatedTask);
    } else {
      const newTask: Omit<Task, "id"> = baseTask;
      taskStore.addTask(newTask);
      clearForm();
    }

    if (onSave) onSave();
    navigate("/");
  };

  return (
    <div className="space-y-4">
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
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default observer(TaskForm);
