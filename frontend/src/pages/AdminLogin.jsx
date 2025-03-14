import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
//import OAuth from '../components/accounts-management/OAuth';

import AdminNavBar from '../components/global-components/adminNavBar';

export default function AdminLogin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const { adminEmail, adminPassword } = formData;

    if (!adminEmail || adminEmail.trim() === '') {
      return 'Email is required';
    }

    if (!adminPassword || adminPassword.trim() === '') {
      return 'Password is required';
    }

    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validate the form
    const validationError = validateForm();
    if (validationError) {
      dispatch(signInFailure(validationError));
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:8070/api/admin/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/Clothes');
    } catch (error) {
      dispatch(signInFailure(error.message));      
    }
  };
  return (
    <div>
      <AdminNavBar/>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Admin Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='adminEmail'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='adminPassword'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/adminSignup'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    </div>
  );
}


