import React from 'react';

interface TaskFormProps {
  taskInput: string;
  setTaskInput: (input: string) => void;
  addTask: (e: React.FormEvent) => void;
  categories: string[];
  taskCategory: string;
  setTaskCategory: (category: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  taskInput,
  setTaskInput,
  addTask,
  categories,
  taskCategory,
  setTaskCategory,
}) => {
  return (
    <form onSubmit={addTask} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <textarea
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
        rows={3}
      />
      <div className="flex items-center mt-3 gap-4">
        <select
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
