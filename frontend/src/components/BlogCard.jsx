import React from "react";
import {Link } from 'react-router-dom'
const BlogCard = ({ blog }) => {
  const text = (blog.content || "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const snippet =
    text.length > 200
      ? text.slice(0, text.lastIndexOf(" ", 200)) + "..."
      : text;

  return (
    <div className="flex justify-center gap-1.5 p-2.5">
      <div className="p-6 bg-[#fef9f1] border-2 border-black max-w-lg w-full rounded-lg shadow-lg fade-up">
        <h2 className="text-xl font-bold mb-4">{blog.title}</h2>
        <p>
          {snippet}
        </p>
        <Link to={`/blogs/${blog._id}`} className="text-blue-700">Read more...</Link>
      </div>
    </div>
  );
};

export default BlogCard;
