import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { createError } from '../middleware/errorHandler';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    next(createError(500, error.message))
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error: any) {
    next(createError(500, error.message))
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
        return next(createError(404, 'User not found'));
      }
      res.json(user);
    } catch (error: any) {
      next(createError(500, error.message));
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.userId } });
    if (!updated) {
        return next(createError(404, "User not found"))
    }
    res.json({ message: "User updated" })
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.userId } });
    if (!deleted) {
        return next(createError(404, "User not found"))
    }
    res.json({ message: "User deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
