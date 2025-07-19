import { useEffect, useState } from "react";
import Layout from "@/shared/ui/layout/Layout";
import TaskForm from "@/entities/task/ui/TaskForm";
import { Button } from "@/shared/ui/shadcn/button";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/entities/task/model/taskStore";
import TaskList from "@/entities/task/ui/TaskList";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const openModal = () => navigate("/?action=newtask");
  const category =
    new URLSearchParams(window.location.search).get("category") || "All";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("action") === "newtask") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    taskStore.loadTasks();
  }, []);

  const closeModal = () => {
    navigate("/");
    setOpen(false);
  };
  return (
    <Layout>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeModal();
          } else {
            setOpen(true);
          }
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            {category}
            <span className="text-muted-foreground ml-2">
              {taskStore.tasks.filter((task) =>
                category === "All" ? true : task.category === category
              ).length || ""}
            </span>
          </h1>
          <div className="flex gap-2">
            <DialogTrigger asChild>
              <Button onClick={() => openModal()}>
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
