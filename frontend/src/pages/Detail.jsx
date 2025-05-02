import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DOMPurify from 'dompurify';

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update-blog/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4001/api/blogs/delete/${id}`, {
          withCredentials: true,
        });
        toast.success("Blog deleted successfully", {
          style: {
            background: 'red',
            color: 'white',
          },
        });
        navigate("/my-blogs");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete blog");
      }
    }
  };

  return (
    <div className="container mx-auto my-12 p-8">
      <div className="text-blue-500 uppercase text-xs font-bold mb-4">
        {blogs?.category}
      </div>
      <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
      <div className="flex items mb-6">
        <img
          src={blogs?.adminPhoto}
          alt="author_avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <p className="text-lg font-semibold">{blogs?.adminName}</p>
      </div>
      <div className="flex flex-col md:flex-row">
        {blogs?.blogImage && (
          <img
            src={blogs?.blogImage?.url}
            alt="mainblogsImg"
            className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
          />
        )}
        <div className="md:w-1/2 w-full md:pl-6">
          <div
            className="prose"
            style={{ whiteSpace: 'pre-wrap' }} // This preserves spaces and line breaks
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogs?.about) }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Detail;
