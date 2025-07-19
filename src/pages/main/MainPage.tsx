import { use, useEffect, useState } from "react";
import Layout from "@/shared/ui/layout/Layout";
import TaskForm from "@/entities/task/ui/TaskForm";
import { Button } from "@/shared/ui/shadcn/button";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/entities/task/model/taskStore";
import TaskList from "@/entities/task/ui/TaskList";

import { useNavigate } from "react-router-dom";

import Filters from "@/entities/task/ui/Filters";
import { Card } from "@/shared/ui/shadcn/card";

import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared/ui/shadcn/dialog";

import { Switch } from "@/shared/ui/shadcn/switch";
import { Label } from "@/shared/ui/shadcn/label";
import { themeStore } from "@/entities/task/model/themeStore";

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
      {/* <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 mb-4 p-20 max-w-[1400px] mx-auto"> */}
      {/* <div className="flex flex-col gap-4">
          <Card className="w-full block p-0 h-fit">
            <Filters />
          </Card>

          <Card className="w-full p-4 gap-4">
            <div className="flex items-center gap-4">
              <Switch
                id="airplane-mode"
                checked={themeStore.theme === "dark"}
                onCheckedChange={(checked) =>
                  themeStore.setTheme(checked ? "dark" : "light")
                }
              />

              <Label htmlFor="airplane-mode">Dark mode</Label>
            </div>
          </Card>
        </div> */}

      {/* <div> */}
      {/* <div className="bg-background shadow-sm border rounded-2xl p-6  "> */}
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
      {/* </div> */}
      {/* </div> */}
    </Layout>
  );
};

export default observer(MainPage);
