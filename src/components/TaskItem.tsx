import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

type TaskItemProps = {
  task: Task;
};

const categoryColors = {
  Bug: "destructive",
  Feature: "green",
  Documentation: "blue",
  Refactor: "yellow",
  Test: "purple",
};

const statusColors = {
  "To Do": "secondary",
  "In Progress": "default",
  Done: "success",
};

const priorityColors = {
  Low: "muted",
  Medium: "default",
  High: "destructive",
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant={categoryColors[task.category]}>{task.category}</Badge>
          <Badge variant={statusColors[task.status]}>{task.status}</Badge>
          <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
        </div>

        <Link to={`/task/${task.id}`}>
          <Button variant="outline" size="sm">
            Редактировать
          </Button>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Редактировать
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактирование задачи</DialogTitle>
            </DialogHeader>
            {/* Здесь вставь форму редактирования */}
            <div>Форма редактирования задачи #{task.id}</div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
