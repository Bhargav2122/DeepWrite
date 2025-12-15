import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { postBlog } from '../features/blog/blogSlice';
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { useNavigate } from 'react-router-dom';


const CreateBlogPage = () => {

   const [ title, setTitle ] = useState('');
   const [ category, setCategory ] = useState('other');
   const [content, setContent] = useState('')
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(postBlog({ title, category, content})).unwrap();
     navigate(`/blogs/${res._id}`);
   }

   return (
     
<form
  onSubmit={handleSubmit}
  className="min-h-screen flex justify-center items-start bg-linear-to-b from-[#1f2233] to-[#191b2a] py-12 px-4"
>
  <div className="w-full max-w-3xl bg-[#262640] rounded-xl shadow-xl p-6 space-y-5">
    
    <h2 className="text-2xl font-semibold text-slate-100">
      Create a Blog
    </h2>

    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
      required
      className="w-full bg-[#2e3150] text-slate-100 placeholder-slate-400 border border-[#3a3e66] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full bg-[#2e3150] text-slate-100 border border-[#3a3e66] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="other">other</option>
      <option value="react">react</option>
      <option value="web">web</option>
      <option value="ai">ai</option>
      <option value="nature">nature</option>
    </select>
    <div className="bg-white rounded-md overflow-hidden">
      <ReactQuill value={content} onChange={setContent} />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition"
    >
      Publish
    </button>
  </div>
</form>


   )

}

export default CreateBlogPage