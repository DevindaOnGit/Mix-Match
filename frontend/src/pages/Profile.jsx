import { useSelector } from 'react-redux';
import {useRef, useState, useEffect} from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; 
import Navbar from '../components/NavBar';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile(){
  const fileRef=useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file,setFile]=useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    if (errorMessage || updateSuccess) {
      const timer = setTimeout(() => {
        setErrorMessage('');
        setUpdateSuccess(false);
      }, 5000); // 5 seconds timeout

      return () => clearTimeout(timer); // Clear timeout on cleanup
    }
  }, [errorMessage, updateSuccess]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);

        setErrorMessage('There was a problem uploading your image. Please try again.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const token = localStorage.getItem('access_token'); 
      //const token = localStorage.getItem('token'); 
      const res = await fetch(`http://localhost:8070/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {

        setErrorMessage('We could not update your profile. Please check your information and try again.'); 
        dispatch(updateUserFailure(data.message));
        return;
      }

      
    // if (!res.ok) {
    //   console.error(`Update failed: ${res.status} - ${res.statusText}`);
    //   dispatch(updateUserFailure(data.message || 'Failed to update user'));
    //   return;
    // }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setErrorMessage(''); 
    } catch (error) {

      setErrorMessage('Something went wrong while updating your profile. Please try again later.');
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:8070/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {

        setErrorMessage('We could not delete your account. Please try again later.');
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {

      setErrorMessage('There was an issue deleting your account. Please try again later.');
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:8070/api/auth/signout');
      

      // const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      //   method: 'DELETE',

      // });
      // Check if the response is OK (status 200-299)
      // if (!res.ok) {
      //   const errorText = await res.text();
      //   throw new Error(`Error: ${res.status} ${res.statusText} - ${errorText}`);
      // }
  
      const data = await res.json();
      if (data.success === false) {

        setErrorMessage('We could not sign you out. Please try again.');
        dispatch(signOutUserFailure(data.message)); 
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {

      setErrorMessage('There was a problem signing you out. Please try again later.');
      dispatch(signOutUserFailure(error.message)); 
      console.error('Sign out error:', error);
    }
  };

  // Function to generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
  
    // Add Title
    doc.setFontSize(18);
    doc.text('User Profile Report', 20, 20);
  
    // Add Date (SLT)
    const date = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      hour12: false,
    });
    doc.setFontSize(12);
    doc.text(`Generated on: ${date} (SLT)`, 20, 30);
  
    // User Details Table
    doc.autoTable({
      startY: 40,
      head: [['Field', 'Details']],
      body: [
        ['Username', currentUser.username],
        ['Email', currentUser.email],
        ['Last Updated', new Date(currentUser.updatedAt).toLocaleString('en-US', {
          timeZone: 'Asia/Colombo',
          hour12: false,
        })],
      ],

      styles: {
        cellPadding: 3,
        fontSize: 10,
        overflow: 'linebreak',  
      },

    });
  
    // Update History Table
    if (currentUser.updateHistory && currentUser.updateHistory.length > 0) {
      const historyBody = currentUser.updateHistory.map((history) => [
        history.field,
        history.previousValue,
        history.newValue,
        new Date(history.updatedAt).toLocaleString('en-US', {
          timeZone: 'Asia/Colombo',
          hour12: false,
        }),
      ]);
  
      doc.autoTable({
        startY: doc.previousAutoTable.finalY + 10, 
        head: [['Field', 'Previous Value', 'New Value', 'Updated At (SLT)']],
        body: historyBody,
        columnStyles: {
          0: { cellWidth: 30 },  // Field column width
          1: { cellWidth: 60 },  // Previous Value column width
          2: { cellWidth: 60 },  // New Value column width
          3: { cellWidth: 40 },  // Updated At column width
        },
        styles: {
          fontSize: 10,
          overflow: 'linebreak',  
        },
      
      });
    } else {
      doc.text('No updates recorded.', 20, doc.previousAutoTable.finalY + 10);
    }
  
    // Save the PDF
    doc.save('user_profile_report.pdf');
  };
  

  // const handleSignOut = async () => {
  //   try {
  //     dispatch(signOutUserStart());
  //     const res = await fetch('http://localhost:8070/api/auth/signout');
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  // Debugging: Log currentUser and formData to ensure they are set correctly
  // useEffect(() => {
  //   console.log('Current User:', currentUser);
  //   console.log('Form Data:', formData);
  // }, [currentUser, formData]);


    return(
      <div>
        <Navbar/>
      
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <input onChange={(e)=>setFile(e.target.files[0])}
          type="file" 
          ref={fileRef} hidden accept='image/*'/>

          <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />

          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>
                Error Image upload (image must be less than 2 mb)
              </span>
              ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
              ''
              )}
              </p>

          <input
            type='text'
            placeholder='username'
            defaultValue={currentUser.username}
            id='username'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='email'
            id='email'
            defaultValue={currentUser.email}
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='password'
            onChange={handleChange}
            id='password'
            className='border p-3 rounded-lg'
          />
           <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

        </form>
        <div className='flex justify-between mt-5'>
            <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>

            <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Logout</span>
        </div>

        <p className='text-red-700 mt-5'>{error ? error :''}</p>
        <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' :''}</p>

        {/* Button to Generate Report */}
        <button onClick={generateReport} className='bg-blue-500 text-white rounded-lg p-3 mt-5'>
        Download Report as PDF
        </button>
        </div>
        </div>
    )
}