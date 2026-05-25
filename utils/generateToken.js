// utils/generateToken.js
import jwt from 'jsonwebtoken';

/**
 * Generate JWT token
 * @param {string} userId - User ID to encode in token
 * @param {string} role - User role (optional)
 * @param {string} expiresIn - Token expiration time (default: 30d)
 * @returns {string} JWT token
 */
export const generateToken = (userId, role = 'user', expiresIn = '30d') => {
  const payload = { userId };
  
  // Add role to payload if provided
  if (role === 'admin') {
    payload.isAdmin = true;
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn
  });
};

/**
 * Set JWT token as cookie and return token
 * @param {object} res - Express response object
 * @param {string} userId - User ID to encode in token
 * @param {boolean} remember - Whether to extend cookie lifetime (remember me)
 * @param {boolean} isAdmin - Whether user is admin
 * @returns {string} JWT token
 */
export const setCookieToken = (res, userId, remember = false, isAdmin = false) => {
  // Set expiration based on "remember me" option
  const expiresIn = remember ? '365d' : (isAdmin ? '7d' : '24h');
  
  // Generate token
  const token = generateToken(userId, isAdmin ? 'admin' : 'user', expiresIn);
  
  // Set cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: remember 
      ? 365 * 24 * 60 * 60 * 1000  // 1 year
      : (isAdmin 
          ? 7 * 24 * 60 * 60 * 1000  // 7 days for admins
          : 24 * 60 * 60 * 1000)     // 24 hours for regular users
  });
  
  return token;
};

/**
 * Get user info from token
 * @param {string} token - JWT token
 * @returns {object|null} User info from token or null if invalid
 */
export const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Default export for cleaner imports
export default generateToken;