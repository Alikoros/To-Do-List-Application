"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  
  const addTask = () => {
    if (task.trim() === "") return; 
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: task, completed: false },
    ]);
    setTask("");
  };

  
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  
  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="m-5 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">To-Do List</h1>
      
      
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          className="border border-gray-300 rounded p-2 flex-1"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      
      <ul className="space-y-2">
        {tasks.length === 0 ? (
          <li className="text-center text-gray-500">No tasks to show.</li>
        ) : (
          tasks.map((t) => (
            <li key={t.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`task-${t.id}`}
                  checked={t.completed}
                  onChange={() => toggleTaskCompletion(t.id)}
                  className="rounded"
                />
                <label
                  htmlFor={`task-${t.id}`}
                  className={`${
                    t.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {t.text}
                </label>
              </div>
              <button
                onClick={() => deleteTask(t.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      
      {tasks.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={clearAllTasks}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear All Tasks
          </button>
        </div>
      )}
    </div>
  );
}
