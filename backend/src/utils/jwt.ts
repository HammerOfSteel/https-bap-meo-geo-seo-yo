// Utility functions for JWT token generation and validation
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRY: string = process.env.JWT_EXPIRY || '7d';

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRY
  } as any);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
