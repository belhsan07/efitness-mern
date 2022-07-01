import jwt from 'jsonwebtoken';
import User from '../dataModels/userModel.js';
import asyncHandler from 'express-async-handler';

// asyncHandler saves you writing your own try/catch for async/await and passes error on to next.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get the token
      token = req.headers.authorization.split(' ')[1];

      // decode the token with the JWT_secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find the user with the id from the database
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('not authorized, no token');
  }
});

export { protect };
