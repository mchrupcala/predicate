import TaskPage from "@/app/components/TaskPage";

export default function Home() {
  const defaultTaskID = "faff78ce-faaa-459a-a5ab-e23202839d9a";
  return <TaskPage taskID={defaultTaskID} />;
}
