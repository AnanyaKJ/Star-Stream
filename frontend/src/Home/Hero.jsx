import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  console.log(blogs);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle blogs and take the first 4
  const shuffledBlogs = blogs ? shuffleArray([...blogs]).slice(0, 4) : [];

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {shuffledBlogs.length > 0 ? (
        shuffledBlogs.map((element) => {
          return (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Container for the blog image and title */}
              <div className="group relative">
                {/* Blog image */}
                <img
                  src={element.blogImage.url}
                  alt=""
                  className="w-full h-56 object-cover"
                />
                {/* Gradient overlay on the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                {/* Blog title */}
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                  {element.title}
                </h1>
              </div>
              {/* Container for the admin photo and additional info */}
              <div className="p-6 flex items-center">
                {/* Admin photo */}
                <img
                  src={element.adminPhoto}
                  alt=""
                  className="w-14 h-14 rounded-full border-2 border-orange-500"
                />
                {/* Additional info (e.g., admin name) */}
                <div className="ml-4">
                  {/* Display admin name */}
                  <p className="text-black text font-semibold">{element.adminName}</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Hero;
