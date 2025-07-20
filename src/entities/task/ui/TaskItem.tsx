import { Card, CardContent, CardTitle } from "@/shared/ui/shadcn/card";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import { Link } from "react-router-dom";
import type { Task } from "@/entities/task/model/taskStore";
import { taskStore } from "@/entities/task/model/taskStore";

import { CircleCheck, Loader } from "lucide-react";
import { ArrowDown, ArrowRight, ArrowUp, Trash2, Edit } from "lucide-react";
import { formatTaskDate } from "@/shared/ui/lib/formatTime";
import { Separator } from "@/shared/ui/shadcn/separator";

type TaskItemProps = {
  task: Task;
};

const statusIcons = {
  "To Do": <CircleCheck className="w-4 h-4" />,
  "In Progress": <Loader className="w-4 h-4" />,
  Done: <CircleCheck className="w-4 h-4" />,
};

const priorityIcons = {
  Low: <ArrowDown className="w-4 h-4" />,
  Medium: <ArrowRight className="w-4 h-4" />,
  High: <ArrowUp className="w-4 h-4" />,
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <Card className="w-full shadow-none">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{task.category}</Badge>
          <Badge variant="outline">
            {statusIcons[task.status]}
            {task.status}
          </Badge>
          <Badge variant="outline">
            {priorityIcons[task.priority]}
            {task.priority}
          </Badge>
        </div>
        <CardTitle className="text-xl">{task.title}</CardTitle>
        {task.description ? (
          <p className="text-sm text-muted-foreground ">{task.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground ">No description</p>
        )}
        <Separator />
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <p className="text-sm text-muted-foreground ">
            {formatTaskDate(task.created_at)}
          </p>
          <div className="flex gap-2">
            <Link to={`/task/${task.id}`}>
              <Button variant="outline" size="sm">
                <Edit /> Edit task
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => taskStore.removeTask(task.id)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
