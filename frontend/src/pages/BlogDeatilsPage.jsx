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
    <div>
        <h1>{blog.title}</h1>
        <p>By:{blog.author?.name || blog.author?.fullname || "Unknown"}</p>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(blog.content)}} />
            {canDelete && (
                <div>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}

    </div>
  )
}

export default BlogDeatilsPage