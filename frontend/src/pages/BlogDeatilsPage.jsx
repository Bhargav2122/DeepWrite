import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'
import {getBlog, removeBlog } from '../features/blog/blogSlice'
import  sanitizeHTML   from '../utils/sanitizeHtml'


const BlogDeatilsPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { blog } = useSelector((s) => s.blogs)
   const { user } = useSelector((s) => s.auth)

   useEffect(() => {
    dispatch(getBlog(id));
   }, [dispatch, id]);

   if(!blog) {
    return <p>Loading...</p>
   }

   const canDelete = user && (user.role === 'admin' || user._id === blog.author?._id)
   const handleDelete = async () => {
            if(!window.confirm('Deleting this blog')) return;
            await dispatch(removeBlog(blog._id)).unwrap();
            navigate('/');  
   }

  return (
<div className="min-h-screen bg-linear-to-b from-[#1f2233] to-[#191b2a] px-4 py-10">
  <div className="mx-auto max-w-3xl bg-[#262640] rounded-xl shadow-xl p-6 md:p-8">
    
    <h1 className="text-2xl text-center md:text-3xl font-bold text-slate-100 mb-2">
      {blog.title}
    </h1>

    <p className="text-sm text-slate-400 mb-6 text-center">
      By {blog.author?.name || blog.author?.fullname || "Unknown"}
    </p>

    <div
      className="prose text-amber-50 prose-invert max-w-none prose-p:text-slate-200 prose-headings:text-slate-100 prose-a:text-indigo-400"
      dangerouslySetInnerHTML={{ __html: sanitizeHTML(blog.content) }}
    />

    {canDelete && (
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Delete
        </button>
      </div>
    )}
  </div>
</div>

  )
}

export default BlogDeatilsPage