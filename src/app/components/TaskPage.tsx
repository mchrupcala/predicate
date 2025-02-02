"use client";

import { useEffect, useState } from "react";
import { getTask } from "@/pages/api/task";

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

export interface Task {
  task_id: string;
  to: string;
  from: string;
  policy_id: string;
  block_expiry: number;
  start_time: number;
  state: string;
  operator_responses: OperatorResponse[];
}

export default function TaskPage({ taskID }: { taskID: string }) {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTask(taskID);
        if (!res) {
          setError("Task not found. Please check your task-id and try again.");
        } else {
          setTask(res);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, [taskID]);

  return (
    <div className="min-h-screen bg-matte-black text-white p-6 flex justify-center items-center">
      {error ? (
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      ) : task ? (
        <div className="w-full max-w-4xl bg-slate-gray p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="mb-6 border-b border-gray-600 pb-4">
            <h2 className="text-lg font-bold text-gray-100">
              Task ID: {task.task_id}
            </h2>
            <p className="mt-2 font-semibold text-predicate-gold">
              State: {task.state}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-predicate-gold font-bold">From</h3>
              <p className="break-all">{task.from}</p>
            </div>
            <div>
              <h3 className="text-predicate-gold font-bold">To</h3>
              <p className="break-all">{task.to}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-predicate-gold">Policy ID:</p>
            <p>{task.policy_id}</p>

            <p className="text-predicate-gold mt-2">Block Expiry:</p>
            <p>{task.block_expiry}</p>

            <p className="text-predicate-gold mt-2">Start Time:</p>
            <p>{new Date(task.start_time * 1000).toLocaleString()}</p>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold text-gray-200">
              Operator Responses
            </h4>
            <div className="max-h-40 overflow-y-auto bg-gray-800 p-2 rounded-md border border-gray-700 mt-2">
              {task.operator_responses.length > 0 ? (
                task.operator_responses.map((response, index) => (
                  <div
                    key={index}
                    className="p-2 border-b border-gray-600 last:border-b-0"
                  >
                    <p className="text-gray-400">
                      Operator Address:{" "}
                      <span className="font-semibold text-gray-400">
                        {response.operator_signing_address}
                      </span>
                    </p>
                    <p>
                      Is Compliant:{" "}
                      <span
                        className={
                          response.is_compliant
                            ? "text-predicate-green font-bold"
                            : "text-red-400 font-bold"
                        }
                      >
                        {response.is_compliant ? "Yes" : "No"}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Metadata Message:{" "}
                      <span>{response.metadata.message || "N/A"}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
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
