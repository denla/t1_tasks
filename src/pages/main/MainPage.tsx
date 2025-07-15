import Layout from "@/shared/ui/layout/Layout";
import TaskForm from "@/entities/task/ui/TaskForm";

import { Button } from "@/shared/ui/shadcn/button";

import { observer } from "mobx-react-lite";
import { taskStore } from "@/entities/task/model/taskStore";

import { useEffect } from "react";
import client from "@/shared/api/apolloClient";
import { gql } from "@apollo/client";
import TaskList from "@/entities/task/ui/TaskList";

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

const MainPage = () => {
  useEffect(() => {
    client
      .query({ query: GET_TASKS })
      .then(({ data }) => {
        console.log("Tasks:", data.tasks);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Layout>
        <h1 className="text-2xl font-semibold mb-[16px]">Create a task</h1>
        <TaskForm />

        <div>
          <div className="flex items-center gap-2 justify-between mt-[32px] mb-[16px]">
            <h1 className="text-2xl font-semibold ">Tasks</h1>
            {taskStore.tasks.length > 0 && (
              <Button onClick={() => taskStore.removeTasks()} variant="outline">
                Clear all
              </Button>
            )}
          </div>

          <TaskList />
        </div>
      </Layout>
    </>
  );
};

export default observer(MainPage);
