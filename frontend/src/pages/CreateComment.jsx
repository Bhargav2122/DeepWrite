import React, { useState } from 'react'
import { postComment } from '../features/comments/commentSlice'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const CreateComment = () => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const { id: blogId } = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!commentText) return;
    await dispatch(postComment({ blogId, text: commentText}))
    setCommentText('')
  }

  return (
    <div className=' font-inter min-h-fit px-4 py-10'>
        <h1></h1>
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl bg-[#262640] rounded-xl shadow-xl p-6 md:p-8" >
            <textarea  type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder='post a comment'
            className='text-white w-full mb-2 outline-none'></textarea>
            <button type='submit' className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition'>post</button>
        </form>
    </div>
  )
}

export default CreateComment