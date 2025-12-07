import api from "../../api/axios";

export const getComments = async(blogId) => {
    const res = await api.get(`/comment/${blogId}`);
    return res.data;
}

export const postComment = async({ blogId, text}) => {
    const res = await api.post(`comment/${blogId}`, { text });
    return res.data;
}

export const deleteComment = async( commentId ) => {
    const res = await api.delete(`comment/${commentId}`);
    return res.data;
}