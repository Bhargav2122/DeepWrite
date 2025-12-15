import { useDispatch,useSelector } from "react-redux";
import { getBlogsByUser } from "../features/blog/blogSlice";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

const MyBlogsPage = () => {
    const dispatch = useDispatch();
    const { blogs,total, page, pages, loading,error } = useSelector((s) => s.blogs) 
    
    const { user } = useSelector((state) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);

     useEffect(() =>{
        dispatch(getBlogsByUser({
            userId: user._id,
            params: {
                currentPage, limit: 5,
            }
        }))
     },[dispatch, user, currentPage])

const handlePageChange = (p) => {
    if (p === page) return;
    setCurrentPage(p);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-slate-400">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1f2233] to-[#191b2a] px-4 py-10">
      
      <h1 className="text-2xl font-bold text-slate-100 text-center mb-8">
        My Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="text-slate-400 col-span-full text-center">
            No blogs found.
          </p>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={pages}
        OnPage={handlePageChange}
      />
    </div>
  );
};

export default MyBlogsPage;