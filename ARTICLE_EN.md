
---
title: 'Building a React Task Manager with Gemini CLI: A Developer''s Story'
published: false
description: 'A step-by-step guide on how I used Google''s Gemini CLI to build a feature-rich task management application with React, TypeScript, and Tailwind CSS.'
tags: react, gemini, typescript, tailwindcss
---

## Introduction

As a developer, I'm always looking for tools that can streamline my workflow and boost my productivity. So, when I heard about Google's Gemini CLI, I was eager to put it to the test. I decided to build a real-world application with it: a task manager.

In this article, I'll walk you through how I used Gemini CLI to create a task management application from scratch. We'll cover everything from setting up the project to implementing features like adding, editing, archiving, and deleting tasks.

## The Stack

For this project, I chose a modern and robust stack:

*   **React:** A popular JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that enhances code quality and maintainability.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Vite:** A blazing-fast build tool and development server.

## Getting Started: Project Setup

The first thing I did was ask Gemini CLI to set up the project. I simply gave it the following prompt:

> "Initialize a new React project with TypeScript and Tailwind CSS using Vite."

Gemini CLI quickly generated the entire project structure, including all the necessary configuration files (`tailwind.config.js`, `vite.config.ts`, `tsconfig.json`, etc.). This saved me a significant amount of time and effort.

## Building the UI: Components and Styling

With the project set up, it was time to start building the UI. I started with the main `App.tsx` component, which serves as the entry point of the application. I also created a `TaskForm.tsx` component to handle the creation of new tasks.

I used Tailwind CSS for styling. I'm a big fan of utility-first CSS, and Tailwind's extensive set of classes allowed me to create a clean and modern UI without writing a single line of custom CSS.

Here's a glimpse of the `App.tsx` component:

```tsx
import { useState } from 'react';
import TaskForm from './components/TaskForm';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
  ]);
  // ... (rest of the component)
}
```

And the `TaskForm.tsx` component:

```tsx
import React from 'react';

interface TaskFormProps {
  taskInput: string;
  setTaskInput: (input: string) => void;
  addTask: (e: React.FormEvent) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskInput, setTaskInput, addTask }) => {
  return (
    <form onSubmit={addTask} className="mb-6">
      <textarea
        value={taskInput}
        onChange={e => setTaskInput(e.target.value)}
        placeholder="Add a new task..."
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
```

## Implementing the Core Features

With the UI in place, I moved on to implementing the core features of the task manager. I used React's `useState` hook to manage the state of the application, including the list of tasks, the task input, and the current view (tasks or archived).

Here's a breakdown of the key features and how I implemented them with the help of Gemini CLI:

*   **Adding Tasks:** The `addTask` function creates a new task object and adds it to the `tasks` array.
*   **Toggling Tasks:** The `toggleTask` function updates the `completed` status of a task.
*   **Editing Tasks:** The `startEditing`, `cancelEditing`, and `saveTask` functions allow users to edit the text of a task.
*   **Archiving and Deleting Tasks:** The `archiveTasks`, `restoreTasks`, `deleteTasks`, and `permanentlyDeleteTasks` functions provide a complete workflow for managing tasks.

I was impressed by how Gemini CLI was able to generate the code for these features with just a few simple prompts. For example, to implement the "edit task" feature, I simply said:

> "Add the ability to edit a task. When the user clicks an 'Edit' button, the task should become a text area. There should be 'Save' and 'Cancel' buttons."

Gemini CLI then generated the necessary state variables, event handlers, and JSX to implement this feature.

## The Final Result

After a few hours of working with Gemini CLI, I had a fully functional task management application. The application allows users to:

*   Create new tasks
*   Mark tasks as complete
*   Edit tasks
*   Archive tasks
*   Restore archived tasks
*   Delete tasks
*   Permanently delete archived tasks

The application is built with a modern and robust stack, and the code is clean, well-structured, and easy to maintain.

## Conclusion

My experience with Gemini CLI was overwhelmingly positive. It's a powerful tool that can significantly speed up the development process. I was particularly impressed by its ability to understand natural language prompts and generate high-quality code.

I would definitely recommend Gemini CLI to any developer who is looking for a way to be more productive. It's a game-changer, and I'm excited to see how it evolves in the future.
