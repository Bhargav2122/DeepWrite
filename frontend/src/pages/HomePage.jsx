import React, { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "../features/blog/blogSlice";
import Pagination from "../components/Pagination";

const HomePage = () => {
 const dispatch = useDispatch();
 const [selectedCategory, setSelectedCategory] = useState('')
 const { blogs,total, page, pages, loading } = useSelector((s) => s.blogs) 
 const [currentPage, setCurrentPage ] = useState(1);
  useEffect(() => {

    dispatch(getBlogs({category: selectedCategory, page: currentPage, limit: 6}))
  },[dispatch, selectedCategory, currentPage])

 const handleCategory = (category) => {
  setSelectedCategory(category);
  setCurrentPage(1);
 }

  return (
    <header className="h-screen">
      <div className="h-[90vh] leading-loose text-white flex flex-col justify-center items-center bg-[#020024] bg-[linear-gradient(180deg,rgba(2,0,36,1)_0%,rgba(9,9,121,1)_35%,rgba(14,23,26,1)_100%)]">
        <h1 className="text-4xl font-sekuya fade-up">DeepWrite</h1>
        <p className="text-xl font-light font-geom fade-up">
          smart writing for smarter minds
        </p>
      </div>

      <section className="bg-linear-to-b from-[#020024] to-[#0d1b3c] py-10">
  <h1 className="text-center text-3xl text-white mb-6">All Blogs</h1>
 
   <CategoryBar selectedCategory={selectedCategory}
         onSelectCategory={handleCategory}
   />
  {loading ? ( <p>loading...</p> ):(
    <>
     {blogs.length === 0 ? (
      <p className="text-gray-300 text-center mt-10">
        No blogs found
      </p>
     ): (
    <>
         <div>
           {blogs.map((b)=> <BlogCard key={b._id} blog={b}/>)}
        </div>
      <Pagination page={page} totalPages={pages} OnPage={setCurrentPage} />
    </>
   )}
  </>
  )}
    
</section>

    </header>
  );
};

export default HomePage;
