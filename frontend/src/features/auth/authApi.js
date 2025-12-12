import api from '../../api/axios'


export const register =  async(data) => {
        const res = await api.post('/auth/register', data);
        //console.log(res.data);
        return res.data;
      
        
}
export const login = async(data) => {
        const res = await api.post('/auth/login', data);
       // console.log(res.data)
        return res.data;
}

export const logout= async() => {
    localStorage.removeItem("user");
}