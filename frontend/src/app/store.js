import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blog/blogSlice'
import commentReducer from '../features/comments/commentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
        comments: commentReducer,
    }
});