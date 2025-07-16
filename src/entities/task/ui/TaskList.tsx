import { useEffect, useState } from "react";
import { taskStore } from "../model/taskStore";
import TaskItem from "./TaskItem";
import SelectField from "@/shared/ui/select/SelectField";

import { Input } from "@/shared/ui/shadcn/input";

const TaskList = () => {
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [priority, setPriority] = useState<string>("All");

  const categories = [
    "All",
    "Bug",
    "Feature",
    "Documentation",
    "Refactor",
    "Test",
  ];
  const statuses = ["All", "To Do", "In Progress", "Done"];
  const priorities = ["All", "Low", "Medium", "High"];

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    taskStore.loadTasks();
  }, [category, status, priority]);

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
      <Input
        type="text"
        placeholder="Search tasks"
        className="w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
          {taskStore.loading ? "Loading tasks..." : " Nothing found"}
        </div>
      )}
    </div>
  );
};

export default TaskList;
