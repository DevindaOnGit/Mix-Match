import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminNavBar = () => {
  const location = useLocation(); // Get the current location to highlight the active link
  const { currentUser } = useSelector((state) => state.user);

  // Function to check if the link matches the current route
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-indigo-700 p-4 fixed left-0 top-0 h-full w-64 flex flex-col justify-between">
      <ul className="flex flex-col space-y-4">
        <li className="flex-1">
          <Link
            to="/admin"
            className={`block text-center text-white hover:text-indigo-300 transition duration-200 ${
              isActive('/admin') ? 'bg-indigo-500' : ''
            } p-4`}
          >
            Dashboard
          </Link>
        </li>
        <li className="flex-1">
          <Link
            to="/clothes"
            className={`block text-center text-white hover:text-indigo-300 transition duration-200 ${
              isActive('/clothes') ? 'bg-indigo-500' : ''
            } p-4`}
          >
            Inventory Management
          </Link>
        </li>
        <li className="flex-1">
          <Link
            to="/UserList"
            className={`block text-center text-white hover:text-indigo-300 transition duration-200 ${
              isActive('/UserList') ? 'bg-indigo-500' : ''
            } p-4`}
          >
            Accounts Management
          </Link>
        </li>
        <li className="flex-1">
          <Link
            to="/cart-dashboard"
            className={`block text-center text-white hover:text-indigo-300 transition duration-200 ${
              isActive('/cart-dashboard') ? 'bg-indigo-500' : ''
            } p-4`}
          >
            Cart Management
          </Link>
        </li>
        <li className="flex-1">
          <Link
            to="/adminLogin"
            className={`block text-center text-white hover:text-indigo-300 transition duration-200 ${
              isActive('/adminLogin') ? 'bg-indigo-500' : ''
            } p-4`}
          >
            Admin Login
          </Link>
        </li>
        <li className="flex-1">
          <Link
            to="/adminSignup"
            className={`block text-center text-white hover:text-indigo-300 transition duration-200 ${
              isActive('/adminSignup') ? 'bg-indigo-500' : ''
            } p-4`}
          >
            Admin Signup
          </Link>
        </li>
        <Link to='/profile'>
          {currentUser ? (
            <img
              className='rounded-full h-7 w-7 object-cover'
              src={currentUser.avatar}
              alt='profile'
            />
          ) : (
            <li className='text-slate-700 hover:underline'>Login</li>
          )}
        </Link>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
