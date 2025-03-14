const express=require('express')
const User = require('../models/adminModel');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken')
const { errorHandler } = require('../utils/error');

// const adminSignup = async (req, res, next) => {
//     const { username, email, password } = req.body;
//     const hashedPassword = bcryptjs.hashSync(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });
//     try {
//       await newUser.save();
//       res.status(201).json('User created successfully!');
//     } catch (error) {

//       if (error.code === 11000) {
//         if (error.keyPattern && error.keyPattern.email) {
//           return next(errorHandler(400, 'This email is already registered. Please log in or use another email.'));
//         }
//         if (error.keyPattern && error.keyPattern.username) {
//           return next(errorHandler(400, 'This username is already taken. Please choose a different username.'));
//         }
//       }
  
//       // Fallback for other errors
//       next(errorHandler(500, 'An error occurred during sign up. Please try again.'));


//       //next(error);
//     }
//   };

const adminSignup = async (req, res, next) => {
    const { adminUsername, adminEmail, adminPassword } = req.body;
    const hashedPassword = bcryptjs.hashSync(adminPassword, 10);
    const newUser = new User({ adminUsername, adminEmail, adminPassword: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      console.log("Signup Error: ", error); // Log the actual error

      if (error.code === 11000) {
        if (error.keyPattern && error.keyPattern.adminEmail) {
          return next(errorHandler(400, 'This email is already registered. Please log in or use another email.'));
        }
        if (error.keyPattern && error.keyPattern.adminUsername) {
          return next(errorHandler(400, 'This username is already taken. Please choose a different username.'));
        }
      }
  
      // Fallback for other errors
      next(errorHandler(500, 'An error occurred during sign up. Please try again.'));
    }
};


const adminLogin = async (req, res, next) => {
    const { adminEmail, adminPassword } = req.body;
    try {
      const validUser = await User.findOne({ adminEmail });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(adminPassword, validUser.adminPassword);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { adminPassword: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true, path: '/' })
        .status(200)
        .json(rest);
    } catch (error) {

      next(errorHandler(500, 'An error occurred during login. Please try again.'));
      //next(error);
    }
};



const adminSignOut = async (req, res, next) => {
  try {
    //res.clearCookie('access_token');

    res.clearCookie('access_token', { httpOnly: true, path: '/' });
    res.status(200).json('User has been logged out!');
  } catch (error) {

    next(errorHandler(500, 'An error occurred during sign out. Please try again.'));
    //next(error);
  }
};

// const signOut = async (req, res, next) => {
//   try {
//     // Log to check if the access_token exists in the request
//     console.log('Cookies before clearing:', req.cookies);

//     // Clear the 'access_token' cookie
//     res.clearCookie('access_token', { httpOnly: true, path: '/' });

//     // Log after trying to clear the cookie
//     console.log('Cookies after clearing:', req.cookies);

//     // Respond with a success message
//     res.status(200).json('User has been logged out!');
//   } catch (error) {
//     next(error);
//   }
//};


module.exports={adminSignup,adminLogin,adminSignOut};