import { Card, CardContent, CardTitle } from "@/shared/ui/shadcn/card";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import { Link } from "react-router-dom";
import type { Task } from "@/entities/task/model/taskStore";

type TaskItemProps = {
  task: Task;
};

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

const categoryColors: Record<Task["category"], BadgeVariant> = {
  Bug: "destructive",
  Feature: "default",
  Documentation: "secondary",
  Refactor: "outline",
  Test: "default",
};

const statusColors: Record<Task["status"], BadgeVariant> = {
  "To Do": "secondary",
  "In Progress": "default",
  Done: "outline",
};

const priorityColors: Record<Task["priority"], BadgeVariant> = {
  Low: "outline",
  Medium: "default",
  High: "destructive",
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant={categoryColors[task.category]}>{task.category}</Badge>
          <Badge variant={statusColors[task.status]}>{task.status}</Badge>
          <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
        </div>
        <CardTitle className="text-xl">{task.title}</CardTitle>
        {task.description ? (
          <p className="text-sm text-muted-foreground ">{task.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground ">No description</p>
        )}
        <Link to={`/task/${task.id}`}>
          <Button variant="outline" size="sm">
            Edit task
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
