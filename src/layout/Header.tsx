import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">TaskFlow</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200 transition duration-300">Tasks</a></li>
            <li><a href="#" className="hover:text-blue-200 transition duration-300">Categories</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
