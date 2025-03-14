const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const { errorHandler } = require('../utils/error');

const test=(req,res)=>{
  res.json({
    message:'Hello',
  });
}

const updateUser = async (req, res, next) => {
 
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    const updatedFields = {};
    if (req.body.username && req.body.username !== user.username) {
      updatedFields.username = {
        previousValue: user.username,
        newValue: req.body.username,
      };
    }
    if (req.body.email && req.body.email !== user.email) {
      updatedFields.email = {
        previousValue: user.email,
        newValue: req.body.email,
      };
    }
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      updatedFields.password = {
        previousValue: '******',
        newValue: '******',
      };
    }
    if (req.body.avatar && req.body.avatar !== user.avatar) {
      updatedFields.avatar = {
        previousValue: user.avatar,
        newValue: req.body.avatar,
      };
    }

    const updateHistory = Object.keys(updatedFields).map((field) => ({
      field,
      previousValue: updatedFields[field].previousValue,
      newValue: updatedFields[field].newValue,
      updatedAt: new Date(), // capture update time
    }));

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },

        $push: { updateHistory: { $each: updateHistory } }, // Save update history

      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Remove password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Email already exists
      return next(errorHandler(400, 'This email is already associated with another account. Please use a different email.'));
    }

    if (error.keyPattern && error.keyPattern.username) {
      // Username already exists
      return next(errorHandler(400, 'This username is already taken. Please choose a different username.'));
    }

    next(error,"next err");
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {

    next(errorHandler(500, 'An error occurred while deleting the account. Please try again later.'));
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Fetch all users
    if (!users) return next(errorHandler(404, 'No users found!'));

    // Remove passwords and avatars from the users before sending the response
    const usersWithoutSensitiveData = users.map((user) => {
      const { password, avatar, ...rest } = user._doc; // Exclude password and avatar
      return rest;
    });

    res.status(200).json(usersWithoutSensitiveData);
  } catch (error) {
    next(error);
  }
};

module.exports={test, updateUser, deleteUser,getAllUsers};