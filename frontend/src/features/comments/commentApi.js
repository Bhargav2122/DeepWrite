import api from "../../api/axios";

export const fetchBlogComments = async(id) => {
    const res = await api.get(`/comment/${id}`);
    console.log(res.data);
    
    return res.data;
} 

export const addComment = async({id, text}) => {
    const res = await api.post(`/comment/${id}`,{text});
    console.log(res.data);
    return res.data;
}

export const deleteComment = async(id) => {
    const res = await api.delete(`/comment/${id}`);
    return res.data;

}