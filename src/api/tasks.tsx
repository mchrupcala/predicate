import { tasksResponse } from "../../sample-tasks-response";
import { TaskResponse } from "@/app/page";
export const getTask = (): TaskResponse | null => {
  //TODO: CORS is blocked locally -- will this work if deployed to Vercel? Do I want to or...nah? How do I present this?
  // const url = process.env.NEXT_PUBLIC_API_URL || "";
  // console.log(url);

  try {
    // const res = await fetch(url);
    console.log(tasksResponse);
    return tasksResponse;
  } catch (error) {
    console.warn("Something went wrong: ", error);
    return null;
  }
};
