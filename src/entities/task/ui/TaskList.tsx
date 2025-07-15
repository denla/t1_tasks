import { taskStore } from "../model/taskStore";
import TaskItem from "./TaskItem";

const TaskList = () => {
  return (
    <div>
      {taskStore.tasks.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {taskStore.tasks.map((task) => (
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
