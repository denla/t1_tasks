import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fix login bug",
    description: "Password field doesn't validate correctly.",
    category: "Bug",
    status: "To Do",
    priority: "High",
  },
];

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const found = mockTasks.find((t) => t.id === id);
    if (found) setTask(found);
  }, [id]);

  const handleChange = (field: keyof Task, value: string) => {
    if (task) setTask({ ...task, [field]: value });
  };

  const handleSave = () => {
    // здесь можно вызвать API или обновить state
    console.log("Saved task:", task);
    navigate("/");
  };

  if (!task) return <div>Загрузка...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Редактировать задачу</h1>

      <div className="space-y-2">
        <Label>Заголовок</Label>
        <Input
          value={task.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Описание</Label>
        <Textarea
          value={task.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Категория</Label>
          <Select
            value={task.category}
            onValueChange={(val) => handleChange("category", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bug">Bug</SelectItem>
              <SelectItem value="Feature">Feature</SelectItem>
              <SelectItem value="Documentation">Documentation</SelectItem>
              <SelectItem value="Refactor">Refactor</SelectItem>
              <SelectItem value="Test">Test</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Статус</Label>
          <Select
            value={task.status}
            onValueChange={(val) => handleChange("status", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Приоритет</Label>
          <Select
            value={task.priority}
            onValueChange={(val) => handleChange("priority", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Приоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button onClick={handleSave}>Сохранить</Button>
      </div>
    </div>
  );
};

export default TaskDetails;
