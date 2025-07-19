import { makeAutoObservable } from "mobx";
import { supabase } from "@/entities/task/model/supabaseClients";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

class TaskStore {
  tasks: Task[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
    this.loadTasks();
  }

  async loadTasks() {
    this.loading = true;
    try {
      const { data } = await supabase.from("tasks").select("*");
      this.tasks = data ?? [];
      this.loading = false;
      console.log("supabase data", data);
    } catch (error) {
      console.log("supabase error");
      console.log(error);
      this.loading = false;
    }
  }

  async addTask(task: Omit<Task, "id">) {
    try {
      const { data } = await supabase.from("tasks").insert([task]).select();
      console.log("supabase data", data);
    } catch (error) {
      console.log("supabase error");
      console.log(error);
    }
    this.loadTasks();
  }

  async updateTask(updated: Task) {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: updated.title,
        description: updated.description,
        category: updated.category,
        status: updated.status,
        priority: updated.priority,
      })
      .eq("id", updated.id)
      .select();
    console.log("supabase data", data);
    console.log("supabase error", error);
    this.loadTasks();
  }

  async removeTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    console.log("supabase error", error);
    this.loadTasks();
  }

  async removeTasks() {
    console.log("remove tasks action called");
  }
}

export const taskStore = new TaskStore();
