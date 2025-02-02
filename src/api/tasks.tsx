// import { tasksResponse } from "../../sample-tasks-response";
import { TaskResponse } from "@/app/page";
export const getTask = async (): Promise<TaskResponse | null> => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.warn("API URL is undefined NEXT_PUBLIC_API_URL");
    return null;
  }
  console.log("url: ", url);

  try {
    const res = await fetch(`${url}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.warn(
        `API request failed with status ${res.status}: ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    console.log("API Response:", data);
    return data as TaskResponse;
  } catch (error) {
    console.error("Something went wrong:", error);
    return null;
  }
};
