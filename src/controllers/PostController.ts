import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import { createError } from '../middleware/errorHandler';

// Create a new Post
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, title, content, categoryIds } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    const post = await Post.create(req.body);

    if (categoryIds && Array.isArray(categoryIds)) {
      const categories = await Category.findAll({ where: { id: categoryIds } });
      await post.$set('categories', categories);
    }

    res.status(201).json(post);
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [User, { model: Category }, { model: Comment, include: [User] }]
    });

    if (!post) {
      next(createError(404, 'Post not found'));
    }

    res.status(200).json(post);
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.findAll({
      include: [User, { model: Category }, { model: Comment, include: [User] }]
    });

    res.status(200).json(posts);
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId } = req.params;
    const { title, content, categoryIds } = req.body;

    const post = await Post.findByPk(postId);
    if (!post) {
      return next(createError(404, 'Post not found'));
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    if (categoryIds && Array.isArray(categoryIds)) {
      const categories = await Category.findAll({ where: { id: categoryIds } });
      await post.$set('categories', categories);
    }

    res.status(200).json(post);
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);

    if (!post) {
      return next(createError(404, 'Post not found'));
    }

    await post.destroy();
    res.status(204).send();
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Add a new category to a post
export const addCategoryToPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const { name } = req.body;

    const post = await Post.findByPk(postId);
    const category = await Category.create(req.body)

    if (!post) {
      return next(createError(404, 'Post not found'));
    }

    await post.$add('category', category);
    res.status(200).json({ message: 'Category added to post' });
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Get all categories for a specific post
export const getCategoriesForPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, { include: [Category] });

    if (!post) {
      return next(createError(404, 'Post not found'));
    }

    res.status(200).json(post.categories);
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Add a new comment to a post
export const addCommentToPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);

    if (!post || !user) {
      next(createError(404, 'Post or User not found'));
    }

    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

// Get all comments for a specific post
export const getCommentsForPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, { include: [{ model: Comment, include: [User] }] });

    if (!post) {
      return next(createError(404, 'Post not found'));
    }

    res.status(200).json(post.comments);
  } catch (error: any) {
    next(createError(500, error.message));
  }
};