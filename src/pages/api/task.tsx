import { Task } from "@/app/components/TaskPage";

export const getTask = async (taskID: string): Promise<Task | null> => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.warn("API URL is undefined NEXT_PUBLIC_API_URL");
    return null;
  }

  try {
    const res = await fetch(`/api/proxy?taskID=${taskID}`);

    if (res.status === 404) {
      console.warn(`Task with ID ${taskID} not found.`);
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch task. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Something went wrong fetching a task:", error);
    return null;
  }
};
