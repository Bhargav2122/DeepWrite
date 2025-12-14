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
     
    <form onSubmit={handleSubmit}>
        <h2>Create a Blog</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required/>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>Select category</option>
            <option value="react">react</option>
            <option value="web">web</option>
            <option value="ai">ai</option>
            <option value="nature">nature</option>
            
        </select>
        <ReactQuill value={content} onChange={setContent} />
        <button type='submit'>Publish</button>
    </form>

   )

}

export default CreateBlogPage