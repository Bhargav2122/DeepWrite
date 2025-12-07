import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";


export const getBlogs = async({ page, limit, category, search}) => {
    const params = {};
    if(page) params.page = page;
    if(limit) params.limit = limit;
    if(category) params.category = category;
    if(search) params.search = search;

    const res = await api.get('/blog/', { params});
    return res.data;
}
 
export const getBlogById = async(id) => {
    const res = await api.get(`/blog/id/${id}`);
    return res.data;
}

export const postBlog = async(data) => {
    const res = await api.post('/blog', data);
    return res.data;
}

export const getBlogsByUser = async(userId, page=1, limit = 10) => {
    const res = await api.get(`/blog/user/${userId}`, {
        params: {page, limit},
    });
    return res.data;
}

export const deleteBlog = async(id) => {
    const res = await api.delete(`/blog/id/${id}`);
    return res.data;
}
