import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Input } from "@/shared/ui/shadcn/input";
import { Textarea } from "@/shared/ui/shadcn/textarea";
import { Button } from "@/shared/ui/shadcn/button";
import SelectField from "@/shared/ui/select/SelectField";

import { Card, CardContent } from "@/shared/ui/shadcn/card";
import { useNavigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { taskStore } from "@/entities/task/model/taskStore";
import type { Task } from "@/entities/task/model/taskStore";

const categories = ["Bug", "Feature", "Documentation", "Refactor", "Test"];
const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["Low", "Medium", "High"];

const TaskForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && taskStore.tasks.length > 0) {
      const task = taskStore.tasks.find((task) => task.id == id);
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
  }, [id]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setStatus("");
    setPriority("");
  };

  const handleSave = () => {
    const newTask: Task = {
      id: id ? id : taskStore.getNewId(),
      title,
      description,
      category: category as Task["category"],
      status: status as Task["status"],
      priority: priority as Task["priority"],
    };

    if (!title || !category || !status || !priority) return;

    if (id) {
      taskStore.updateTask(newTask);
    } else {
      taskStore.addTask(newTask);
      clearForm();
    }

    navigate("/");
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

        <Button onClick={handleSave}>Save</Button>
      </CardContent>
    </Card>
  );
};

export default observer(TaskForm);
