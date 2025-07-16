import TaskForm from "@/entities/task/ui/TaskForm";
import Layout from "@/shared/ui/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/shadcn/button";
import { ArrowLeft } from "lucide-react";

const TaskPage = () => {
  return (
    <Layout>
      <Link to="/">
        <Button variant="outline">
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <h1 className="text-2xl font-semibold mt-[16px] mb-[16px]">Edit task</h1>
      <TaskForm />
    </Layout>
  );
};

export default TaskPage;
