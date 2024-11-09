import express from 'express';
import { addCategoryToPost, addCommentToPost, createPost, deletePost, getAllPosts, getCategoriesForPost, getCommentsForPost, getPostById, updatePost } from '../controllers/PostController';

const router = express.Router();

router.post('/', createPost); // POST /api/posts - Create a new post
router.get('/', getAllPosts); // GET /api/posts - Retrieve all posts
router.get('/:postId', getPostById); // GET /api/posts/:postId - Retrieve a specific post by ID
router.put('/:postId', updatePost); // PUT /api/posts/:postId - Update a post by ID
router.delete('/:postId', deletePost); // DELETE /api/posts/:postId - Delete a post by ID
router.post('/:postId/categories', addCategoryToPost); // POST /api/posts/:postId/categories - Add a category to a post
router.get('/:postId/categories', getCategoriesForPost); // GET /api/posts/:postId/categories - Get categories for a specific post
router.post('/:postId/comments', addCommentToPost); // POST /api/posts/:postId/comments - Add a comment to a post
router.get('/:postId/comments', getCommentsForPost); // GET /api/posts/:postId/comments - Get comments for a specific post

export default router;
