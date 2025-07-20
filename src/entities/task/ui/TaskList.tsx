import { useEffect, useState } from "react";
import { taskStore } from "../model/taskStore";
import TaskItem from "./TaskItem";
import TaskItemRow from "./TaskItemRow";

import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/shadcn/popover";

import {
  ListFilter,
  LoaderCircle,
  LayoutGrid,
  List,
  Search,
} from "lucide-react";
import Filters from "./Filters";
import { filterStore } from "../model/filterStore";

import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";

import { motion, AnimatePresence } from "framer-motion";

const TaskList = () => {
  const [toggleView, setToggleView] = useState("grid");

  useEffect(() => {
    taskStore.loadTasks();
  }, []);

  const category = new URLSearchParams(useLocation().search).get("category");

  useEffect(() => {
    filterStore.setCategory(category ?? "All");
    console.log("category", filterStore.category);
  }, [category]);

  const filteredTasks = taskStore.tasks
    .filter(
      (el) =>
        (filterStore.category === "All" ||
          el.category === filterStore.category) &&
        (filterStore.status === "All" || el.status === filterStore.status) &&
        (filterStore.priority === "All" ||
          el.priority === filterStore.priority) &&
        (el.title.toLowerCase().includes(filterStore.search.toLowerCase()) ||
          (el.description &&
            el.description
              .toLowerCase()
              .includes(filterStore.search.toLowerCase())))
    )
    .sort((a, b) => {
      const aDate = new Date(a.created_at || "");
      const bDate = new Date(b.created_at || "");
      return bDate.getTime() - aDate.getTime();
    });

  return (
    <div>
      <div className="flex flex-row gap-4 mb-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search tasks"
            className="pl-10"
            value={filterStore.search}
            onChange={(e) => filterStore.setSearch(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">
              <ListFilter className="w-4 h-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Filters />
          </PopoverContent>
        </Popover>

        <Tabs value={toggleView} onValueChange={setToggleView}>
          <TabsList>
            <TabsTrigger value="grid">
              <LayoutGrid />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredTasks.length > 0 ? (
        <div
          className={
            toggleView === "list"
              ? "flex flex-col gap-0 border rounded-xl overflow-x-auto"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) =>
              toggleView === "list" ? (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <TaskItemRow key={task.id} task={task} />
                </motion.div>
              ) : (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.1 }}
                >
                  <TaskItem key={task.id} task={task} />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="p-20 w-full flex justify-center">
          {taskStore.loading ? (
            <LoaderCircle className="w-8 h-8 animate-spin" />
          ) : (
            "Nothing found"
          )}
        </div>
      )}
    </div>
  );
};

export default observer(TaskList);
