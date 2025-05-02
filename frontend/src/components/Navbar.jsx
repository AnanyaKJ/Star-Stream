import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log(profile?.user);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      console.log(data);
      localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      {/* Navbar container with shadow, padding, and flexbox for layout */}
      <nav className="shadow-lg px-4 py-2" style={{ backgroundColor: 'black' }}>
        <div className="flex items-center justify-between container mx-auto">
          {/* Brand logo image */}
          <div className="font-semibold text-xl">
            <img src="/logo22.png" alt="Logo" className="h-16 w-100" /> {/* Logo image from public folder with increased size */}
          </div>
          {/* Desktop navigation links */}
          <div className="hidden md:flex mx-6 flex-grow justify-center space-x-6"> {/* Centered navigation links */}
            <Link to="/" className="text-white hover:text-yellow-300">HOME</Link>
            <Link to="/blogs" className="text-white hover:text-yellow-300">BLOGS</Link>
            <Link to="/creators" className="text-white hover:text-yellow-300">CREATORS</Link>
            <Link to="/about" className="text-white hover:text-yellow-300">ABOUT</Link>
            <Link to="/contact" className="text-white hover:text-yellow-300">CONTACT</Link>
          </div>
          {/* Right side links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-800 hover:text-white">DASHBOARD</Link>
                <button onClick={handleLogout} className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-900 hover:text-white">LOGOUT</button>
              </>
            ) : (
              <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:text-black">LOGIN</Link>
            )}
          </div>
          {/* Mobile menu icon */}
          <div className="md:hidden" onClick={() => setShow(!show)}>
            {show ? <IoCloseSharp size={24} className="text-white" /> : <AiOutlineMenu size={24} className="text-white" />}
          </div>
        </div>
        {/* Mobile navigation links */}
        {show && (
          <div className="md:hidden mt-2 flex flex-col items-center">
            <ul className="flex flex-col items-center space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-yellow-300" onClick={() => setShow(false)}>HOME</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-white hover:text-yellow-300" onClick={() => setShow(false)}>BLOGS</Link>
              </li>
              <li>
                <Link to="/creators" className="text-white hover:text-yellow-300" onClick={() => setShow(false)}>CREATORS</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-yellow-300" onClick={() => setShow(false)}>ABOUT</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-yellow-300" onClick={() => setShow(false)}>CONTACT</Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-800 hover:text-white" onClick={() => setShow(false)}>DASHBOARD</Link>
                  </li>
                  <li>
                    <button onClick={(e) => { handleLogout(e); setShow(false); }} className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-900 hover:text-white">LOGOUT</button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:text-black" onClick={() => setShow(false)}>LOGIN</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;