import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/my-blog",
          { withCredentials: true }
        );
        console.log(data);
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blogs");
      }
    };
    fetchMyBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/bg.png')" }}>
      <div className="w-full my-12 p-8 flex-grow">
        <h1 className="text-2xl font-bold mb-12">My Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginLeft: '20%' }}>
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-black text-center col-span-full">NO Blogs Found . You have yet to post any blogs!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
