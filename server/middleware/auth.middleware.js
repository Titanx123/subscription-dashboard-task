import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.userId).select('-password -refreshToken');
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found.' 
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: 'Token expired.',
          code: 'TOKEN_EXPIRED'
        });
      }
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin only.' 
    });
  }
  next();
};