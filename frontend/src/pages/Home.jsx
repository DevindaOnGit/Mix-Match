import React from 'react';
import '../App.css';
import UserList from '../components/accounts-management/UserList';

const Home = () => {
  return (
    <div
      className="flex flex-col justify-center items-center pt-10 text-center" 
    >
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-2 text-lg">Mix And Match.</p>
      <UserList />
    </div>
  );
};

export default Home;
