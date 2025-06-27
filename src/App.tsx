import { useState } from 'react';
import TaskForm from './components/TaskForm';
import Header from './layout/Header';
import CategoryForm from './components/CategoryForm';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  createdAt: Date;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Learn React', completed: true, category: 'Learning', createdAt: new Date() },
    {
      id: 2,
      text: 'Build a Todo App #React',
      completed: false,
      category: 'React',
      createdAt: new Date(),
    },
  ]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [view, setView] = useState<'tasks' | 'archived'>('tasks');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['Learning', 'React', 'General']);
  const [categoryInput, setCategoryInput] = useState('');
  const [taskCategory, setTaskCategory] = useState<string>('General');

  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryInput.trim() || categories.includes(categoryInput.trim())) {
      setCategoryInput('');
      return;
    }
    const newCategory = categoryInput.trim();
    setCategories([...categories, newCategory]);
    setCategoryInput('');
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      category: taskCategory,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const archiveTasks = () => {
    const tasksToArchive = tasks.filter((task) => selectedTaskIds.includes(task.id));
    setTasks(tasks.filter((task) => !selectedTaskIds.includes(task.id)));
    setArchivedTasks([...archivedTasks, ...tasksToArchive]);
    setSelectedTaskIds([]);
  };

  const restoreTasks = () => {
    const tasksToRestore = archivedTasks.filter((task) => selectedTaskIds.includes(task.id));
    setArchivedTasks(archivedTasks.filter((task) => !selectedTaskIds.includes(task.id)));
    setTasks([...tasks, ...tasksToRestore]);
    setSelectedTaskIds([]);
  };

  const deleteTasks = () => {
    setTasks(tasks.filter((task) => !selectedTaskIds.includes(task.id)));
    setSelectedTaskIds([]);
  };

  const permanentlyDeleteTasks = () => {
    setArchivedTasks(archivedTasks.filter((task) => !selectedTaskIds.includes(task.id)));
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
      tasks.map((task) => (task.id === editingTaskId ? { ...task, text: editingTaskText } : task)),
    );
    cancelEditing();
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id],
    );
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen flex flex-wrap justify-center p-8 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-3/5 lg:w-1/2 xl:w-2/5">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Task Manager</h1>
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setView('tasks')}
              className={`flex-1 py-3 text-center font-semibold text-lg transition-all duration-300 ${view === 'tasks' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-gray-600 hover:text-blue-500'}`}
            >
              Tasks
            </button>
            <button
              onClick={() => setView('archived')}
              className={`flex-1 py-3 text-center font-semibold text-lg transition-all duration-300 ${view === 'archived' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-gray-600 hover:text-blue-500'}`}
            >
              Archived
            </button>
          </div>

          {view === 'tasks' ? (
            <>
              <TaskForm
                taskInput={taskInput}
                setTaskInput={setTaskInput}
                addTask={addTask}
                categories={categories}
                taskCategory={taskCategory}
                setTaskCategory={setTaskCategory}
              />
              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={archiveTasks}
                    disabled={selectedTaskIds.length === 0}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 enabled:hover:bg-yellow-600 enabled:cursor-pointer transition duration-300 shadow-md"
                  >
                    Archive Selected
                  </button>
                  <button
                    onClick={deleteTasks}
                    disabled={selectedTaskIds.length === 0}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 enabled:hover:bg-red-600 enabled:cursor-pointer transition duration-300 shadow-md"
                  >
                    Delete Selected
                  </button>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <ul>
                {tasks
                  .filter(
                    (task) => selectedCategory === 'all' || task.category === selectedCategory,
                  )
                  .map((task) => (
                    <li
                      key={task.id}
                      className="p-4 mb-3 rounded-lg shadow-sm bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <div
                        className={`flex items-center justify-between transition-colors ${task.completed ? 'bg-green-50' : 'bg-white'}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTaskIds.includes(task.id)}
                          onChange={() => handleCheckboxChange(task.id)}
                          className="mr-3 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-grow">
                          <span
                            onClick={() => toggleTask(task.id)}
                            className={`cursor-pointer text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                          >
                            {task.text}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {task.category}
                            </span>{' '}
                            - <span className="ml-1">{task.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(task)}
                            className="text-blue-600 hover:text-blue-800 font-medium transition duration-300"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      {editingTaskId === task.id && (
                        <form onSubmit={saveTask} className="mt-4 p-3 bg-gray-50 rounded-md">
                          <textarea
                            value={editingTaskText}
                            onChange={(e) => setEditingTaskText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                            rows={2}
                          />
                          <div className="flex justify-end items-center mt-3 gap-2">
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
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
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 enabled:hover:bg-green-600 enabled:cursor-pointer transition duration-300 shadow-md"
                >
                  Restore Selected
                </button>
                <button
                  onClick={permanentlyDeleteTasks}
                  disabled={selectedTaskIds.length === 0}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 enabled:hover:bg-red-600 enabled:cursor-pointer transition duration-300 shadow-md"
                >
                  Permanently Delete Selected
                </button>
              </div>
              <ul>
                {archivedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-4 mb-3 rounded-lg shadow-sm bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="checkbox"
                        checked={selectedTaskIds.includes(task.id)}
                        onChange={() => handleCheckboxChange(task.id)}
                        className="mr-3 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <span
                        className={`flex-grow text-lg ${task.completed ? 'line-through text-gray-600' : 'text-gray-800'}`}
                      >
                        {task.text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-2/5 lg:w-1/3 xl:w-1/4">
          <CategoryForm
            categoryInput={categoryInput}
            setCategoryInput={setCategoryInput}
            addCategory={addCategory}
          />
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              Existing Categories
            </h2>
            <ul>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="p-3 mb-2 rounded-md bg-blue-50 text-blue-800 text-center font-medium shadow-sm hover:bg-blue-100 transition duration-300"
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
