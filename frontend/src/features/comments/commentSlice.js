import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBlogComments, addComment, deleteComment } from "./commentApi";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const getCommentsByBlog = createAsyncThunk(
  "comment/get",
  async (blogId, thunkAPI) => {
    try {
      return await fetchBlogComments(blogId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);
export const postComment = createAsyncThunk(
  "comment/post",
  async ({ blogId, text }, thunkAPI) => {
    try {
      return await addComment({ id: blogId, text });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);
export const removeComment = createAsyncThunk(
  "comment/delete",
  async (commentId, thunkAPI) => {
    try {
      return await deleteComment(commentId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getCommentsByBlog.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(getCommentsByBlog.fulfilled, (s, a) => {
        s.comments = a.payload;
        s.loading = false;
      })
      .addCase(getCommentsByBlog.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(postComment.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(postComment.fulfilled, (s, a) => {
        s.comments.unshift(a.payload);
        s.loading = false;
      })
      .addCase(postComment.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(removeComment.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(removeComment.fulfilled, (s, a) => {
        s.loading = false;
        s.comments = s.comments.filter((c) => c._id !== a.meta.arg);
      })
      .addCase(removeComment.rejected, (s,a) => {
  s.loading = false;
  s.error = a.payload;
})
  },
});

export default commentSlice.reducer;
