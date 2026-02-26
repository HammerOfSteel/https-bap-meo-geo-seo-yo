import express, { Express, Request, Response, NextFunction } from 'express';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role: 'USER' | 'ADMIN';
      };
    }
  }
}

export {};
