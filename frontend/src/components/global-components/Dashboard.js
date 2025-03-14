import React, { useState } from 'react';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-indigo-700 text-white flex flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className={`text-2xl font-bold ${!sidebarOpen && 'hidden'}`}>Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {sidebarOpen ? '❮' : '❯'}
          </button>
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-4">
            <li className="group">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-indigo-500 transition-colors duration-300"
              >
                <span className={`material-icons text-2xl ${!sidebarOpen && 'mx-auto'}`}>home</span>
                {/* <span className={`${!sidebarOpen && 'hidden'} ml-4`}>Home</span> */}
              </a>
            </li>
            <li className="group">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-indigo-500 transition-colors duration-300"
              >
                <span className={`material-icons text-2xl ${!sidebarOpen && 'mx-auto'}`}>Inventory</span>
                {/* <span className={`${!sidebarOpen && 'hidden'} ml-4`}>Dashboard</span> */}
              </a>
            </li>
            <li className="group">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-indigo-500 transition-colors duration-300"
              >
                <span className={`material-icons text-2xl ${!sidebarOpen && 'mx-auto'}`}>Accounts</span>
                {/* <span className={`${!sidebarOpen && 'hidden'} ml-4`}>Settings</span> */}
              </a>
            </li>
            <li className="group">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-indigo-500 transition-colors duration-300"
              >
                <span className={`material-icons text-2xl ${!sidebarOpen && 'mx-auto'}`}>Cart</span>
                {/* <span className={`${!sidebarOpen && 'hidden'} ml-4`}>Settings</span> */}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <p>This is the main content area. Customize it based on your application.</p>
      </div>
    </div>
  );
}

export default Dashboard;
