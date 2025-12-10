import { fetchBlogs, fetchBlogById, createBlog, fetchBlogsByUser, deleteBlog } from './blogApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    blogs: [],
    blog: null,
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null,
};

export const getBlogs = createAsyncThunk("blog/getAll", async(params, thunkAPI) => {
    try {
        return await fetchBlogs(params);
    } catch (err ) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message);
        
    }
});

export const getBlog = createAsyncThunk("/blog/getSingle", async(id, thunkAPI) => {
    try {
        return await fetchBlogById(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message)
        
    }
});

export const postBlog = createAsyncThunk("/blog/create", async(data, thunkAPI) => {
    try {
        return await createBlog(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message) 
    }
});
export const getBlogsByUser = createAsyncThunk("/blog/getuser", async({ userId, params }, thunkAPI) => {
    try {
        return await fetchBlogsByUser(userId, params);
    } catch (err ) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message)  
    }
})

export const removeBlog = createAsyncThunk("/blog/deleteBlog", async(id) => {
    try {
        return await deleteBlog(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message)
    }
})


const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers:{},
    extraReducers: (b) => {
        b
        .addCase(getBlogs.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(getBlogs.fulfilled, (s,a) => {
            s.loading = false;
            s.blogs = a.payload.blogs;
            s.total = a.payload.total;
            s.page = a.payload.page;
            s.pages = a.payload.pages;
        })
        .addCase(getBlogs.rejected, (s,a) => {
            s.loading = false;
            s.error = a.payload;
        })
        .addCase(getBlog.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(getBlog.fulfilled, (s, a) => {
            s.loading = false;
            s.blog = a.payload;
        })
        .addCase(getBlog.rejected, (s, a) => {
            s.loading = false;
            s.error = a.payload;
        })
        .addCase(postBlog.pending, (s, a) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(postBlog.fulfilled, (s, a) => {
            s.loading = false;
            s.blogs.unshift(a.payload);
        })
        .addCase(postBlog.rejected, (s, a) => {
            s.loading = false;
            s.error = a.error?.message || "Post failed";
        })
        .addCase(getBlogsByUser.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(getBlogsByUser.fulfilled, (s, a) => {
            s.loading = false;
            s.blogs = a.payload.blogs;
            s.total = a.payload.total;
            s.page = a.payload.page;
            s.pages = a.payload.pages;
        })
        .addCase(getBlogsByUser.rejected, (s, a) => {
            s.loading = false;
            s.error = null;
        })
        .addCase(removeBlog.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(removeBlog.fulfilled, (s, a) => {
            s.loading = false;
            s.blogs = s.blogs.filter((b) => b._id !== a.meta.arg);
        })
        .addCase(removeBlog.rejected, (s, a) => {
            s.loading = false;
            s.error = a.payload;
        });
    },
});

export default blogSlice.reducer;