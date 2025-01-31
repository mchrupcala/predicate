"use client";

import { useEffect, useState } from "react";
import { getTask } from "../api/tasks";

interface OperatorResponse {
  task_id: string;
  operator_signing_address: string;
  is_compliant: boolean;
  signature: string;
  metadata: {
    message: string;
    error_type: string;
  };
}

interface Task {
  task_id: string;
  to: string;
  from: string;
  policy_id: string;
  block_expiry: number;
  start_time: number;
  state: string;
  operator_responses: OperatorResponse[];
}

// interface TaskResponse {
//   tasks: Task[];
// }

export default function Home() {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTask();
        if (!res || !res.tasks || res.tasks.length === 0) {
          throw new Error("No tasks available.");
        }
        setTask(res.tasks[0]);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0C0F] text-white p-6 flex justify-center items-center">
      {error ? (
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      ) : task ? (
        <div className="w-full max-w-3xl bg-[#1A1C1F] p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="mb-6 border-b border-gray-600 pb-4">
            <h2 className="text-lg font-bold text-gray-100">Task ID:</h2>
            <p className="text-gray-300 break-all">{task.task_id}</p>
            <p className="mt-2 font-semibold text-blue-400">
              State: {task.state}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-400">From</h3>
              <p className="text-gray-300 break-all">{task.from}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">To</h3>
              <p className="text-gray-300 break-all">{task.to}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-sm">Policy ID:</p>
            <p className="text-gray-300">{task.policy_id}</p>

            <p className="text-gray-400 text-sm mt-2">Block Expiry:</p>
            <p className="text-gray-300">{task.block_expiry}</p>

            <p className="text-gray-400 text-sm mt-2">Start Time:</p>
            <p className="text-gray-300">
              {new Date(task.start_time * 1000).toLocaleString()}
            </p>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold text-gray-200">
              Operator Responses
            </h4>
            <div className="max-h-40 overflow-y-auto bg-gray-800 p-4 rounded-md border border-gray-700 mt-2">
              {task.operator_responses.length > 0 ? (
                task.operator_responses.map((response, index) => (
                  <div
                    key={index}
                    className="p-2 border-b border-gray-600 last:border-b-0"
                  >
                    <p className="text-sm text-gray-400">
                      Operator Address:{" "}
                      <span className="font-semibold text-green-400">
                        {response.operator_signing_address.slice(-4)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-300">
                      Is Compliant:{" "}
                      <span
                        className={
                          response.is_compliant
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {response.is_compliant ? "Yes" : "No"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Metadata Message:{" "}
                      <span className="text-gray-300">
                        {response.metadata.message || "N/A"}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  No operator responses available.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">Loading task...</p>
      )}
    </div>
  );
}
