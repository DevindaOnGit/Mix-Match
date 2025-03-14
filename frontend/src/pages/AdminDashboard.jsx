import React from 'react';
import '../App.css';
//import UserList from '../components/accounts-management/UserList';
import AdminNavBar from '../components/global-components/adminNavBar';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavBar/>
    
    <div
      className="flex flex-col justify-center items-center pt-10 text-center" 
    >
      <h1 className="text-2xl font-bold">Admin Dasboard</h1>
      <p className="mt-2 text-lg">Mix And Match.</p>
      
    </div>
    </div>
  );
};

export default AdminDashboard;
