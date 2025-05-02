import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  console.log(blogs);
  return (
    //added the div here for bg image 
    <div 
      className=" bg-cover bg-center"
      style={{ backgroundImage: "url('/starnightbg.jpg')" }}
    >
      <div className="container mx-auto py-12 px-4">
        <div className="bg-blue-1000 bg-opacity-90 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-white">All Blogs of Star Stream here!!!</h1>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <Link
                  to={`/blog/${blog.id}`}
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={blog?.blogImage?.url}
                    alt={blog?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-lg font-semibold">{blog?.title}</h2>
                    <p className="text-sm text-yellow-400">{blog?.category}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                No blogs available at the moment
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
