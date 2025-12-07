import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogs, getBlogById, postBlog, getBlogsByUser, deleteBlog } from './blogApi';
import { act } from "react";

export const deleteBlog = createAsyncThunk('blog/delete', async({ id, blogAuthorId, user}, thunkAPI) => {
    if(user._id !== blogAuthorId && user.role !== 'admin') {
        return thunkAPI.rejectWithValue("Not Authorized to delete");
    }

    try {
        return await deleteBlog(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg);
    }
});


export const getBlogs = createAsyncThunk('blog/getBlogs', async(params, thunkAPI) => {
    try{
        return await getBlogs(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg);
    } 
})

export const getBlogById = createAsyncThunk('blog/getblogbyId', async(id, thunkAPI) => {
    try {
        return await getBlogById(id);
    } catch (err) {
         return thunkAPI.rejectWithValue(err.response?.data?.msg);
    }
})

export const postBlog = createAsyncThunk('blog/postBlog', async(ReportBody, thunkAPI) => {
    try{
        return await postBlog(body);
    } catch (err) {
         return thunkAPI.rejectWithValue(err.response?.data?.msg);
    } 
})

export const getBlogsByUser = createAsyncThunk('blog/getuserblogs', async({ userId, page, limit}, thunkAPI) => {
    try {
      return await getBlogsByUser(userId, page, limit);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg);
    }
})

const initialState = {
    blogs:[],
    total:0,
    pages:0,
    page:1,
    blogDetails:null,
    loading:false,
    error:null
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBlogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getBlogs.fulfilled, (state, action)=>{
            state.loading = false;
            state.blogs = action.payload.blogs;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        })
        .addCase(getBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getBlogById.fulfilled, (state, action) => {
            state.blogDetails = action.payload;
        })
        .addCase(postBlog.fulfilled, (state, action) => {
            state.blogs.unshift(action.payload);
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            const id = action.meta.arg.id;
            state.blogs = state.blogs.filter(b => b._id !== id);
        })
        .addCase(deleteBlog.rejected, (state,action) => {
            state.error = action.payload;
        })
        .addCase(getBlogsByUser.fulfilled, (state, action) => {
            state.blogs = action.payload.blogs;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        });
    }
});

export default blogSlice.reducer;