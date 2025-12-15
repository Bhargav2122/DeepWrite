import api from "../../api/axios";

export const fetchBlogs = async(params = {}) => {
    const res = await api.get('/blog', { params });
    return res.data;
}

export const fetchBlogById = async (id) => {
    const res = await api.get(`/blog/id/${id}`);
    return res.data;
}

export const createBlog = async(data) => {
    const res = await api.post('/blog', data);
    return res.data;
}

export const fetchBlogsByUser = async(userId, params= {}) => {
    const res = await api.get(`/blog/user/${userId}`, {params});
    console.log(res.data)
    return res.data;
}
export const deleteBlog = async(id) => {
    const res = await api.delete(`/blog/id/${id}`);
    return res.data;
}