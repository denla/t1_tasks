import { useEffect, useState } from "react";
import { taskStore } from "../model/taskStore";
import TaskItem from "./TaskItem";
import SelectField from "@/shared/ui/select/SelectField";

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

  useEffect(() => {
    taskStore.loadTasks();
  }, [category, status, priority]);

  return (
    <div>
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
      {taskStore.tasks.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {taskStore.tasks
            .filter(
              (el) =>
                (category === "All" || el.category === category) &&
                (status === "All" || el.currentStatus === status) &&
                (priority === "All" || el.priority === priority)
            )
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </div>
      ) : (
        <div className="p-20 w-full flex justify-center">
          {taskStore.loading
            ? "Loading tasks..."
            : " Nothing found. Please create a task."}
        </div>
      )}
    </div>
  );
};

export default TaskList;
