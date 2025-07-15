import { makeAutoObservable } from "mobx";

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

  constructor() {
    makeAutoObservable(this);
    const stored = localStorage.getItem("tasks");
    if (stored) {
      this.tasks = JSON.parse(stored);
    }
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.save();
  }

  removeTasks() {
    this.tasks = [];
    this.save();
  }

  updateTask(updated: Task) {
    this.tasks = this.tasks.map((task) =>
      task.id == updated.id ? updated : task
    );
    this.save();
  }

  getNewId() {
    if (this.tasks.length === 0) return "1";
    return (
      Math.max(...this.tasks.map((task) => Number(task.id))) + 1
    ).toString();
  }

  private save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}

export const taskStore = new TaskStore();
