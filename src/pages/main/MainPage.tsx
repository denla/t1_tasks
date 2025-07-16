import { useEffect, useState } from "react";
import Layout from "@/shared/ui/layout/Layout";
import TaskForm from "@/entities/task/ui/TaskForm";
import { Button } from "@/shared/ui/shadcn/button";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/entities/task/model/taskStore";
import TaskList from "@/entities/task/ui/TaskList";

import { Plus } from "lucide-react";

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
          <h1 className="text-2xl font-semibold">
            Tasks{" "}
            <span className="text-muted-foreground">
              {taskStore.tasks.length}
            </span>
          </h1>
          <div className="flex gap-2">
            {/* {taskStore.tasks.length > 0 && (
              <Button onClick={() => taskStore.removeTasks()} variant="outline">
                <Trash />
                Clear tasks
              </Button>
            )} */}

            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)}>
                <Plus /> Create task
              </Button>
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
