import express from 'express';
import { getCommentByBlog, postComment, deleteComment } from '../controllers/commentController.js';
import { verify } from '../middleware/verifyToken.js';

const router = express.Router();


 router.post('/:blogId', verify, postComment );
 router.get('/:blogId', getCommentByBlog);
 router.delete('/:commentId', verify, deleteComment)

 
 export default router;