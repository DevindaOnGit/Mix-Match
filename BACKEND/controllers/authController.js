// import User from '../models/userModel.js';
// import bcryptjs from 'bcryptjs';
//import { errorHandler } from '../utils/error.js';
//import jwt from 'jsonwebtoken';

const express=require('express')
//const signup=require('../controllers/authController')
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken')
//const errorHandler = require('../utils/error');
const { errorHandler } = require('../utils/error');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {

      if (error.code === 11000) {
        if (error.keyPattern && error.keyPattern.email) {
          return next(errorHandler(400, 'This email is already registered. Please log in or use another email.'));
        }
        if (error.keyPattern && error.keyPattern.username) {
          return next(errorHandler(400, 'This username is already taken. Please choose a different username.'));
        }
      }
  
      // Fallback for other errors
      next(errorHandler(500, 'An error occurred during sign up. Please try again.'));
      console

      //next(error);
    }
  };

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true, path: '/' })
        .status(200)
        .json(rest);
    } catch (error) {
      console.log("Login Error: ", error);
      next(errorHandler(500, 'An error occurred during login. Please try again.'));
      //next(error);
    }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true, path: '/' })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true, path: '/' })
        .status(200)
        .json(rest);
    }
  } catch (error) {

    next(errorHandler(500, 'An error occurred during Google authentication. Please try again.'));
    //next(error);
  }
};

const signOut = async (req, res, next) => {
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


module.exports={signup,login,google,signOut};