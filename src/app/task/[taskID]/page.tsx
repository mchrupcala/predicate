"use client";
import { useParams } from "next/navigation";
import TaskPage from "@/app/components/TaskPage";

export default function TaskPageWrapper() {
  const params = useParams();
  const taskID = params ? (params.taskID as string) : "";

  return <TaskPage taskID={taskID} />;
}
