import { useEffect, useState } from "react";
import Layout from "@/shared/ui/layout/Layout";
import TaskForm from "@/entities/task/ui/TaskForm";
import { Button } from "@/shared/ui/shadcn/button";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/entities/task/model/taskStore";
import TaskList from "@/entities/task/ui/TaskList";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared/ui/shadcn/dialog";

const MainPage = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    taskStore.loadTasks();
  }, []);

  const closeModal = () => setOpen(false);

  return (
    <Layout>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <div className="flex gap-2">
            {taskStore.tasks.length > 0 && (
              <Button onClick={() => taskStore.removeTasks()} variant="outline">
                Clear all
              </Button>
            )}

            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)}>Create Task</Button>
            </DialogTrigger>
          </div>
        </div>

        <TaskList />

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create a task</DialogTitle>
            <DialogClose asChild></DialogClose>
          </DialogHeader>
          <TaskForm onSave={closeModal} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default observer(MainPage);
