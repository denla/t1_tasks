import { makeAutoObservable } from "mobx";
import axios from "axios";
const url = "";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  created_at?: string;
};

class TaskStore {
  tasks: Task[] = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.loadTasks();
  }

  async loadTasks() {
    this.loading = true;
    axios
      .get(`${url}/api/tasks`)
      .then((res) => {
        this.tasks = res.data;
        console.log(res.data);
      })
      .then(() => (this.loading = false));
  }

  async addTask(task: Omit<Task, "id">) {
    axios.post(`${url}/api/tasks`, task).then((res) => {
      this.tasks.push(res.data);
    });
  }

  async removeTask(id: string) {
    axios.delete(`${url}/api/tasks/${id}`).then(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  async updateTask(updated: Task) {
    axios.patch(`${url}/api/tasks/${updated.id}`, updated).then((res) => {
      console.log(res.data);
    });
    this.loadTasks();
  }

  async removeTasks() {
    console.log("remove tasks action called");
  }
}

export const taskStore = new TaskStore();
