import { makeAutoObservable, runInAction } from "mobx";
import client from "@/shared/api/apolloClient";
import { gql } from "@apollo/client";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  currentStatus: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
};

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      category
      currentStatus
      priority
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($input: TaskCreateInput!) {
    createTask(data: $input) {
      id
      title
      description
      category
      currentStatus
      priority
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: TaskUpdateInput!) {
    updateTask(where: { id: $id }, data: $input) {
      id
      title
      description
      category
      currentStatus
      priority
    }
  }
`;

const PUBLISH_TASK = gql`
  mutation PublishTask($id: ID!) {
    publishTask(where: { id: $id }) {
      id
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(where: { id: $id }) {
      id
    }
  }
`;

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
      const { data } = await client.query({
        query: GET_TASKS,
        fetchPolicy: "network-only",
      });
      runInAction(() => {
        this.tasks = data.tasks;
        this.loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.loading = false;
      });
      console.error("Failed to load tasks", e);
    }
  }

  async addTask(task: Omit<Task, "id">) {
    try {
      const { data } = await client.mutate({
        mutation: ADD_TASK,
        variables: { input: task },
      });
      const createdTask = data.createTask;

      await client.mutate({
        mutation: PUBLISH_TASK,
        variables: { id: createdTask.id },
      });

      runInAction(() => {
        this.tasks.push(data.createTask);
      });
    } catch (e) {
      console.error("Failed to add task", e);
    }
  }

  async updateTask(updated: Task) {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: updated.id,
          input: {
            title: updated.title,
            description: updated.description,
            category: updated.category,
            currentStatus: updated.currentStatus,
            priority: updated.priority,
          },
        },
      });

      const updatedTask = data.updateTask;

      await client.mutate({
        mutation: PUBLISH_TASK,
        variables: { id: updatedTask.id },
      });

      runInAction(() => {
        this.tasks = this.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
      });
    } catch (e) {
      console.error("Failed to update task", e);
    }
  }

  async removeTask(id: string) {
    try {
      await client.mutate({
        mutation: DELETE_TASK,
        variables: { id },
      });
      runInAction(() => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
      });
    } catch (e) {
      console.error("Failed to delete task", e);
    }
  }

  async removeTasks() {
    for (const task of this.tasks) {
      await this.removeTask(task.id);
    }
  }
}

export const taskStore = new TaskStore();
