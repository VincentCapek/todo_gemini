import React from 'react';

interface CategoryFormProps {
  categoryInput: string;
  setCategoryInput: (input: string) => void;
  addCategory: (e: React.FormEvent) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryInput, setCategoryInput, addCategory }) => {
  return (
    <form onSubmit={addCategory} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Create Category</h2>
      <textarea
        value={categoryInput}
        onChange={e => setCategoryInput(e.target.value)}
        placeholder="Add a new category..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 resize-y"
        rows={2}
      />
      <button type="submit" className="w-full mt-3 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 ease-in-out shadow-md">
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
