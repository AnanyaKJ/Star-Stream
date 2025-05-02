import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function NIE() {
  const { blogs } = useAuth();
  const nieBlogs = blogs?.filter((blog) => blog.category === "NIE");

  return (
    <div>
      {/* ✅ FIX: Center align the entire NIE section horizontally, same as "Trending" above */}
      <div className="container mx-auto my-16 p-4 max-w-8xl">

        <div className="mb-4">
          {/* ✅ This is the NIE heading and subtext block */}
          <h1 className="text-2xl font-semibold mb-1 text-white">
            National Institute of Engineering, Mysore
          </h1>
          <p className="text-sm text-yellow-400 mb-4">
            Innovating for Excellence
          </p>
        </div>

        {/* ✅ Cards grid: displays NIE-related blog cards */}
        {/* Optional: Adjust column count here for layout changes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {nieBlogs && nieBlogs.length > 0 ? (
            nieBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id || index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex h-screen items-center justify-center">
              Loading....
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NIE;
