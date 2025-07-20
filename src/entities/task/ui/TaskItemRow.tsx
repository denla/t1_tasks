import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import { Link } from "react-router-dom";
import type { Task } from "@/entities/task/model/taskStore";

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
    <div className="flex items-center w-full justify-between gap-4 p-2 border-b bg-background hover:bg-muted transition">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex flex-col gap-1 w-full truncate p-1">
          <p className="font-medium truncate">{task.title}</p>
          <p className="text-sm text-muted-foreground truncate">
            {task.description || "No description"}
          </p>
        </div>

        <div className="flex gap-2 shrink-0 flex-wrap">
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
      </div>
      <div className="flex gap-2 w-[50px] shrink-0 justify-end">
        <Link to={`/task/${task.id}`}>
          <Button variant="ghost" size="sm">
            <Ellipsis />
          </Button>
        </Link>
      </div>
    </div>
  );
}
