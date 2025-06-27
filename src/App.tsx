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
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [view, setView] = useState<'tasks' | 'archived'>('tasks');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const archiveTasks = () => {
    const tasksToArchive = tasks.filter(task => selectedTaskIds.includes(task.id));
    setTasks(tasks.filter(task => !selectedTaskIds.includes(task.id)));
    setArchivedTasks([...archivedTasks, ...tasksToArchive]);
    setSelectedTaskIds([]);
  };

  const restoreTasks = () => {
    const tasksToRestore = archivedTasks.filter(task => selectedTaskIds.includes(task.id));
    setArchivedTasks(archivedTasks.filter(task => !selectedTaskIds.includes(task.id)));
    setTasks([...tasks, ...tasksToRestore]);
    setSelectedTaskIds([]);
  };

  const deleteTasks = () => {
    setTasks(tasks.filter(task => !selectedTaskIds.includes(task.id)));
    setSelectedTaskIds([]);
  };

  const permanentlyDeleteTasks = () => {
    setArchivedTasks(archivedTasks.filter(task => !selectedTaskIds.includes(task.id)));
    setSelectedTaskIds([]);
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  const saveTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks(
      tasks.map(task =>
        task.id === editingTaskId ? { ...task, text: editingTaskText } : task
      )
    );
    cancelEditing();
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedTaskIds(prev =>
      prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>
        <div className="flex border-b mb-6">
          <button
            onClick={() => setView('tasks')}
            className={`flex-1 py-2 text-center font-semibold ${view === 'tasks' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
            Tasks
          </button>
          <button
            onClick={() => setView('archived')}
            className={`flex-1 py-2 text-center font-semibold ${view === 'archived' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
            Archived
          </button>
        </div>

        {view === 'tasks' ? (
          <>
            <TaskForm
              taskInput={taskInput}
              setTaskInput={setTaskInput}
              addTask={addTask}
            />
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={archiveTasks}
                disabled={selectedTaskIds.length === 0}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50 enabled:hover:bg-yellow-600 enabled:cursor-pointer"
              >
                Archive Selected
              </button>
              <button
                onClick={deleteTasks}
                disabled={selectedTaskIds.length === 0}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50 enabled:hover:bg-red-600 enabled:cursor-pointer"
              >
                Delete Selected
              </button>
            </div>
            <ul>
              {tasks.map(task => (
                <li key={task.id} className="p-3 mb-2 rounded-md bg-gray-50">
                  <div className={`flex items-center justify-between transition-colors ${task.completed ? 'bg-green-100' : 'bg-gray-50'}`}>
                    <input
                      type="checkbox"
                      checked={selectedTaskIds.includes(task.id)}
                      onChange={() => handleCheckboxChange(task.id)}
                      className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span
                      onClick={() => toggleTask(task.id)}
                      className={`cursor-pointer flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.text}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-700 font-bold">
                        Edit
                      </button>
                    </div>
                  </div>
                  {editingTaskId === task.id && (
                    <form onSubmit={saveTask} className="mt-4">
                      <textarea
                        value={editingTaskText}
                        onChange={e => setEditingTaskText(e.target.value)}
                        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={cancelEditing} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">
                          Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={restoreTasks}
                disabled={selectedTaskIds.length === 0}
                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50">
                Restore Selected
              </button>
              <button
                onClick={permanentlyDeleteTasks}
                disabled={selectedTaskIds.length === 0}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50">
                Permanently Delete Selected
              </button>
            </div>
            <ul>
              {archivedTasks.map(task => (
                <li
                  key={task.id}
                  className="p-3 mb-2 rounded-md bg-gray-200">
                  <div className="flex items-center justify-between">
                    <input
                      type="checkbox"
                      checked={selectedTaskIds.includes(task.id)}
                      onChange={() => handleCheckboxChange(task.id)}
                      className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className={`flex-grow ${task.completed ? 'line-through text-gray-600' : ''}`}>{task.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
