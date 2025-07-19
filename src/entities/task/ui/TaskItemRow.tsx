// import { Card, CardContent, CardTitle } from "@/shared/ui/shadcn/card";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import { Link } from "react-router-dom";
import type { Task } from "@/entities/task/model/taskStore";
import { taskStore } from "@/entities/task/model/taskStore";

import { CircleCheck, Loader } from "lucide-react";
import { ArrowDown, ArrowRight, ArrowUp, Ellipsis } from "lucide-react";

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
    <div className="flex items-center justify-between gap-4 p-2 border-b bg-background hover:bg-muted transition">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex gap-2 shrink-0 w-60">
          <Badge variant="outline">{task.category}</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            {statusIcons[task.status]}
            {task.status}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            {priorityIcons[task.priority]}
            {task.priority}
          </Badge>
        </div>

        <div className="flex min-w-0 flex-row gap-4 align-center">
          <p className="font-medium truncate w-60">{task.title}</p>
          <p className="text-sm text-muted-foreground truncate">
            {task.description || "No description"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <Link to={`/task/${task.id}`}>
          <Button variant="ghost" size="sm">
            <Ellipsis />
            {/* Edit */}
          </Button>
        </Link>
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => taskStore.removeTask(task.id)}
        >
          Remove
        </Button> */}
      </div>
    </div>
  );
}
