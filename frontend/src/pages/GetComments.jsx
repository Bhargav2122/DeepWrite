import React, { useEffect } from "react";
import {
  getCommentsByBlog,
  removeComment,
} from "../features/comments/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const GetComments = () => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((s) => s.comments);
  const { id: blogId } = useParams();

  useEffect(() => {
    if (blogId) {
      dispatch(getCommentsByBlog(blogId));
    }
  }, [dispatch, blogId]);

  const handleDelete = async (commentId) => {
    await dispatch(removeComment(commentId));
  };


  return (
<div className="font-inter max-w-xl mx-auto p-4 bg-gray-900 rounded-xl shadow-md">
  <h1 className="text-xl font-semibold text-violet-400 mb-4">Comments</h1>
  {loading ? (
    <p className="text-gray-400">Loading comments...</p>
  ) : comments && comments.length > 0 ? (
    comments.map((c) => (
      <div
        key={c._id}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-3 mb-3 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="mb-2 sm:mb-0">
          <p className="text-sm text-gray-400">user: <span className="text-white font-medium">{c.user?.fullname}</span></p>
          <p className="text-white mt-1">{c.text}</p>
        </div>
        <button
          onClick={() => handleDelete(c._id)}
          className="text-red-500 hover:text-red-400 text-xl transition-colors duration-150"
        >
          ❌
        </button>
      </div>
    ))
  ) : (
    <p className="text-gray-400">No Comments yet.</p>
  )}
</div>
  );
};

export default GetComments;
