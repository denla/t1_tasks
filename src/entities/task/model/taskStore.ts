import { makeAutoObservable } from "mobx";
import axios from "axios";

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
    axios.get("http://localhost:3000/tasks").then((res) => {
      this.tasks = res.data;
      console.log(res.data);
    });
  }

  async addTask(task: Omit<Task, "id">) {
    axios.post("http://localhost:3000/tasks", task).then((res) => {
      this.tasks.push(res.data);
    });
  }

  async removeTask(id: string) {
    axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  async updateTask(updated: Task) {
    axios
      .patch(`http://localhost:3000/tasks/${updated.id}`, updated)
      .then((res) => {
        console.log(res.data);
      });
    this.loadTasks();
  }

  async removeTasks() {
    console.log("remove tasks action called");
  }
}

export const taskStore = new TaskStore();
