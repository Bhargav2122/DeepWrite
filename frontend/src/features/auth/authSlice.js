import { register, login, logout } from './authApi';
import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';

const stored = JSON.parse(localStorage.getItem("user"));


const initialState = {
    user: stored || null,
    loading: false,
    error: null,
}

export const registerUser = createAsyncThunk("/auth/register", async(formData, thunkAPI) => {
    try {
        return await register(formData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message);        
    }
})
export const loginUser = createAsyncThunk("/auth/login", async(formData, thunkAPI) => {
    try {
        const res = await login(formData);
        localStorage.setItem("user", JSON.stringify(res));
        return res;
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message);        
    }
})
export const logoutUser = createAsyncThunk("auth/logout", async() => {
    await logout();
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (b) => {
        b
        .addCase(registerUser.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(registerUser.fulfilled, (s,a) => {
            s.loading = false;
        })
        .addCase(registerUser.rejected, (s,a) => {
            s.loading = false;
            s.error = a.payload;
        })
        .addCase(loginUser.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(loginUser.fulfilled, (s,a) => {
            s.user = a.payload;
            s.loading = false;
        })
        .addCase(loginUser.rejected, (s,a) => {
            s.loading = false;
            s.error = a.payload;
        })
        .addCase(logoutUser.fulfilled, (s) => {
            s.user = null;
        })
    },
});

export default authSlice.reducer;



