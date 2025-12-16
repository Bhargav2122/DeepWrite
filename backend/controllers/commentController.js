import Comment from '../models/comment.js';
import Blog from '../models/blog.js';
import asyncHandler from 'express-async-handler';


export const postComment = asyncHandler(async(req, res) => {
    const { blogId } = req.params;
    const { text } = req.body;
    if(!req.user) {
        res.status(401).json({ msg: "UnAuthorized"})
    }
    if(!text) {
        res.status(400).json({ msg: "comment text requires"})
    }
    const blog = await Blog.findById(blogId);
    if(!blog) {
        res.status(404).json({ msg: "Blog not found" })
    }
    const comment = await Comment.create({text, user: req.user._id, blog: blogId});
    res.status(201).json(comment);
});


export const getCommentByBlog = asyncHandler(async(req, res) => {
    const {blogId} = req.params;
    const comments = await Comment.find({ blog: blogId}).populate('user', 'fullname email')
    .sort({ createdAt: -1});
    res.json(comments);
})

export const deleteComment = asyncHandler(async( req, res )=> {
    const comment = await Comment.findById(req.params.commentId);
    if(!req.user._id) {
        res.status(401).json({ msg: 'Unauthorized'})
    }
    if(!comment) {
        res.status(404).json({msg: "Comment not found"});

    }
    if(comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403).json({ msg: "Not Authorized" });
    }
    await comment.deleteOne();
    res.status(200).json({msg: "Comment deleted"});
})