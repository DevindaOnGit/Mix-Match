import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserAccountAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8070/api/user');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (selectedMonth !== '') {
      const filtered = users.filter(user => {
        const createdAt = new Date(user.createdAt);
        return createdAt.getMonth() === parseInt(selectedMonth);
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [selectedMonth, users]);

  // Function to count users created per day in the selected month
  const countUsersByDay = () => {
    const counts = Array(31).fill(0);
    filteredUsers.forEach(user => {
      const createdAt = new Date(user.createdAt);
      const dayOfMonth = createdAt.getDate();
      counts[dayOfMonth - 1]++;
    });
    return counts;
  };

  const data = countUsersByDay().map((count, index) => ({
    day: index + 1,
    users: count,
  }));

  return (
    <div className="flex justify-center items-center p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">User Account Creation Analytics</h2>

        {/* Month Selection */}
        <div className="flex justify-center items-center mb-8">
          <label htmlFor="month-select" className="mr-4 text-lg text-gray-700">Select a Month:</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="" disabled>Please select a month</option>
            {[...Array(12).keys()].map(index => (
              <option key={index} value={index}>{getMonthName(index)}</option>
            ))}
          </select>
        </div>

        {selectedMonth !== '' && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-center mb-4">User Account Creations in {getMonthName(selectedMonth)}</h3>
            
            {/* Reducing chart size to fit well */}
            <div className="flex justify-center">
              <ResponsiveContainer width="90%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getMonthName = (monthIndex) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex];
};

export default UserAccountAnalytics;
