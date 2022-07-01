import asyncHandler from 'express-async-handler';
import User from '../dataModels/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // In DB, find email that matches email from the body
  const user = await User.findOne({ email: email });

  // matchPassword is a schema method created in userModel.js
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // Need token authorization to access some private routes
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email and password');
  }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

// To register a User
const registerUser = asyncHandler(async (req, res) => {
  // get name, email, and password from the body
  const { name, email, password } = req.body;

  // Check if user exists yet
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // if a user doesn't exist
  // create a new one using the User model
  const user = await User.create({
    name,
    email,
    password,
  });

  // if user is created
  if (user) {
    // send this json
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
