import asyncHandler from "express-async-handler";
import Blog from "../models/blog.js";
import sanitizeHtml from 'sanitize-html'


export const getBlogs = asyncHandler( async(req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    
    const query = {};

    if(req.query.category) query.category = req.query.category;
    if(req.query.search) query.$text = { $search: req.query.search };

    const [total, blogs] = await Promise.all([
        Blog.countDocuments(query),
        Blog.find(query)
        .populate('author', 'fullname email image')
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(limit)
    ])
    res.json({ total, page, pages: Math.ceil(total / limit), blogs});

})


 export const postBlog = asyncHandler( async( req, res) => {
    let { title, content, category, image=''} = req.body;
    if(!category) {
        category = 'other'
    }
    if(!title || !content) {
        res.status(400).json({ msg: "title and content are required"});
    }

    content = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "p", "span", "b", "ul", "li"]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img:["src", "alt", "width", "height"],
        },
    })
    const blog = await Blog.create({ title, content, category, image, author: req.user._id});
    res.status(200).json(blog);
 });

 export const getBlogById = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate('author', 'fullname email image');
    if(!blog) {
        res.status(400).json({ msg: 'Blog not found'});

    }
    res.json(blog);
 })

 export const getBlogsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const page = Number(req.query.page) || 1;
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const [total, blogs] = await Promise.all([
    Blog.countDocuments({ author: userId }),
    Blog.find({ author: userId })
      .populate("author", "fullname email image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
  ]);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    blogs
  });

});

export const deleteBlog = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        res.status(400).json({msg:" Blog not Found"});
    }

    if(blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin' ) {
        res.status(403).json({ msg: "Not Authorized to delete the blog"});
    }
    await blog.deleteOne();
    res.json({ msg: 'Blog removed'});
});
