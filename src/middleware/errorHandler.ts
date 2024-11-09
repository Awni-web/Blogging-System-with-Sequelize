// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

// Custom error handler middleware
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`Error: ${message}`, err);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

// Utility function to create errors with status codes
export const createError = (statusCode: number, message: string) => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};
