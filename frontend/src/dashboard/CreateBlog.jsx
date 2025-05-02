import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Sanitize the about content to ensure it's safe for HTML rendering
    const sanitizedAbout = DOMPurify.sanitize(
      about
        .replace(/\n/g, '<br />') // Replace newlines with <br />
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **bold** to <strong>
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Convert *italic* to <em>
    );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", sanitizedAbout); // Store the sanitized content
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      await axios.post("http://localhost:4001/api/blogs/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog created successfully");
    } catch (error) {
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/bg.png')" }}>
      <div className="w-full my-12 p-8 flex-grow" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="bg-purple-200 bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-12 text-center">Create Blog</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              >
                <option value="">Select Category</option>
                <option value="NIE">NIE</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
                <option value="News">News</option>
                <option value="Politics">Politics</option>
                <option value="Recommendations">Recommendations</option>
                <option value="Motivation">Motivation</option>
                <option value="Guidance">Guidance</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
              {blogImagePreview && (
                <img
                  src={blogImagePreview}
                  alt="Blog Preview"
                  className="w-full h-48 object-cover mt-4 rounded-md"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea
                rows="5"
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            {/* Displaying the About content with formatting */}
            <div className="mt-4">
              <h2 className="text-xl font-bold">Preview:</h2>
              <div
                className="border border-gray-300 p-4 rounded-md"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(about.replace(/\n/g, '<br />')) }} // Show sanitized content
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
