import { useEffect, useState } from "react";
import { taskStore } from "../model/taskStore";
import TaskItem from "./TaskItem";

import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/shadcn/popover";

import { ListFilter, LoaderCircle } from "lucide-react";
import Filters from "./Filters";

const TaskList = () => {
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [priority, setPriority] = useState<string>("All");

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    taskStore.loadTasks();
  }, [category, status, priority]);

  const clearFilters = () => {
    setCategory("All");
    setStatus("All");
    setPriority("All");
  };

  const filteredTasks = taskStore.tasks.filter(
    (el) =>
      (category === "All" || el.category === category) &&
      (status === "All" || el.currentStatus === status) &&
      (priority === "All" || el.priority === priority) &&
      (el.title.toLowerCase().includes(search.toLowerCase()) ||
        (el.description &&
          el.description.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div>
      <div className="flex flex-row gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search tasks"
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">
              <ListFilter className="w-4 h-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Filters
              category={category}
              setCategory={setCategory}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              clearFilters={clearFilters}
            />
          </PopoverContent>
        </Popover>
      </div>

      {filteredTasks.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {taskStore.tasks
            .filter(
              (el) =>
                (category === "All" || el.category === category) &&
                (status === "All" || el.currentStatus === status) &&
                (priority === "All" || el.priority === priority) &&
                (el.title.toLowerCase().includes(search.toLowerCase()) ||
                  (el.description &&
                    el.description
                      .toLowerCase()
                      .includes(search.toLowerCase())))
            )
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </div>
      ) : (
        <div className="p-20 w-full flex justify-center">
          {taskStore.loading ? (
            <LoaderCircle className="w-8 h-8 animate-spin" />
          ) : (
            " Nothing found"
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
