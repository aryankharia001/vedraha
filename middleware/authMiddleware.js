import User from '../models/NabhiUser.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// Middleware to protect routes by verifying JWT authentication token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } 
  // Fallback to Authorization header if cookie is not present
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token (exclude password)
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401);
    
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else {
      throw new Error('Not authorized');
    }
  }
});

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403); // Changed from 401 to 403 (Forbidden) for semantic accuracy
    throw new Error('Not authorized as an admin');
  }
};

// New middleware: Verify token without requiring user to be logged in
// Useful for public pages that need optional authentication
const optionalProtect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } 
  // Fallback to Authorization header if cookie is not present
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // No token, but that's okay - proceed without user info
    req.user = null;
    return next();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token (exclude password)
    req.user = await User.findById(decoded.userId).select('-password');
    
    next();
  } catch (error) {
    // Token is invalid but that's okay for optional protection
    // Just proceed without user info
    req.user = null;
    next();
  }
});

export { protect, admin, optionalProtect };