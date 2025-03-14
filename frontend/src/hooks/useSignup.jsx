// import { useState, useContext  } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export const useSignup = () => {
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { dispatch } = useContext(AuthContext);

//   const signup = async (email, password) => {
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch('http://localhost:8070/api/user/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Signup failed');
//       }

//       // Save the user to the context and localStorage
//       localStorage.setItem('user', JSON.stringify(data));  // Store user in local storage
//       dispatch({ type: 'LOGIN', payload: data });  // Dispatch login action with user data


//       // Assume successful signup if no errors
//       return true;
//     } catch (err) {
//       setError(err.message);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { signup, error, isLoading };
// };
