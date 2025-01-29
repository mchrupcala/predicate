"use client";

import { getTask } from "../api/tasks";
import { useEffect, useState } from "react";

interface TASK_RESPONSE {
  taskId: string;
  status: string;
}

export default function Home() {
  const [task, setTask] = useState<null | Promise<TASK_RESPONSE> | undefined>(
    null
  );

  useEffect(() => {
    const asyncGetTasks = async () => {
      const res = await getTask();
      console.log(res);

      return res;
    };

    setTask(asyncGetTasks());
  }, []);

  return <div>{}</div>;
}
