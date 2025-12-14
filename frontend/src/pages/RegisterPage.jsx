import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(registerUser(form)).unwrap();
      navigate("/login");
    } catch (err) {
      console.log("register error", err);
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
        <h2 className="mb-2.5 text-xl sm:text-2xl">Create Your Account</h2>
        <input
          type="text"
          name="fullname"
          placeholder="Enter your fullname"
          value={form.fullname}
          onChange={handleChange}
          className="w-full outline-none border-b m-2.5 text-sm"
          required
        />

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
        <button
          type="submit"
          disabled={loading}
          className="bg-white min-w-full text-black p-1 rounded-xs m-2.5 cursor-pointer text-md"
        >
          {loading ? (
            <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Register"
          )}
        </button>
        <p className="text-[1rem] sm:text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-400">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
