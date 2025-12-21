import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [open, setOpen] = useState(false);

  return (
    <nav className=" bg-[linear-gradient(180deg,#1a1a1a,#000000,#1f1f1f)] text-white  flex items-center justify-between h-[10vh]">
      {/* Logo */}
      <h2 className="font-gothic text-base md:text-lg lg:text-2xl">
        DeepWrite
      </h2>

      {/* Hamburger / Close Button */}
      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>

      {/* Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-4 md:gap-6 font-gothic tracking-wide absolute md:static top-16 right-4 md:right-0 bg-[rgba(11,36,50,0.95)] md:bg-transparent px-4 py-4 rounded-xl md:rounded-none backdrop-blur-sm`}
      >
        {user ? (
          <>
            <Link
              to="/"
              className="font-gothic text-base md:text-lg lg:text-[1.02rem] hover-underline"
            >
              Home
            </Link>

            <Link
              to="/create"
              className="font-gothic text-base md:text-lg lg:text-[1.02rem] hover-underline"
            >
             Create
            </Link>

            <Link
              to="/my"
              className="font-gothic text-base md:text-lg lg:text-[1.02rem] hover-underline"
            >
              Myblogs
            </Link>

            <button
              onClick={() => dispatch(logoutUser())}
              className="hover-underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="font-gothic text-base md:text-lg lg:text-xl hover-underline"
            >
              Login
            </Link>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;