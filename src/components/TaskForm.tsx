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
