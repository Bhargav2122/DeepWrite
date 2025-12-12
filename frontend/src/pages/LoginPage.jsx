import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';


const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await dispatch(loginUser(form)).unwrap();
       navigate("/");
    } catch (err) {
      console.log("login error", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center font-gothic h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-[linear-gradient(135deg,#000000,#000000)] text-white flex flex-col items-center p-10 rounded-xl"
      >
        <h2 className="mb-2.5 text-xl sm:text-2xl">Login to your Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter valid email"
          value={form.email}
          onChange={handleChange}
          className="w-full outline-none border-b m-2.5 text-sm"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter your password"
          value={form.password}
          className="w-full outline-none border-b m-2.5 text-sm"
          required
        />
        <button type="submit" className="bg-white min-w-full text-black p-1 rounded-xs m-2.5 cursor-pointer text-md">
         login
        </button>
        <p className="text-[1rem] sm:text-sm">
         Don't have an account? <Link to="/register" className="underline text-blue-400">register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage
