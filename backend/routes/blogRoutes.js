import express from 'express';
import { deleteBlog, getBlogById , getBlogs, postBlog, getBlogsByUser,  } from '../controllers/blogController.js';
import { isAdmin, verify } from '../middleware/verifyToken.js'

const router = express.Router();

router.get('/', getBlogs);
router.post('/', verify, postBlog);
router.get('/user/:userId', getBlogsByUser);
router.get('/category/:category', getBlogs);
router.get('/id/:id', getBlogById);
router.delete('/id/:id', verify, deleteBlog );
export default router;