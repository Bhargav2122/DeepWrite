import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const registerUser = createAsyncThunk('auth/register', async(formData) => {
    const res = await api.post('auth/register', formData);
    return res.data;
})

export const loginUser = createAsyncThunk('auth/login', async(formData) => {
    const res = await api.post('auth/login', formData);
    return res.data;
})

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
    
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;