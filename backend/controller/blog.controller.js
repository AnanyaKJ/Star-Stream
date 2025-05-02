// Import Mongoose for MongoDB interactions and ObjectId validation
import mongoose from "mongoose"; 

// Import the Blog model schema for database operations
import { Blog } from "../models/blog.model.js"; 

// Import Cloudinary v2 API for image upload and storage
import { v2 as cloudinary } from "cloudinary"; 

/**
 * Create Blog Controller
 * 
 * Handles creation of new blog posts with image upload to Cloudinary.
 * Requires authentication and admin privileges (enforced in routes).
 * 
 * @param {object} req - Express request containing blog data and image file
 * @param {object} res - Express response for sending back status and data
 */
export const createBlog = async (req, res) => {
  try {
    // Check if a blog image was uploaded - it's required for all blog posts
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" }); 
    }

    // Extract the blog image from the uploaded files
    const { blogImage } = req.files; 
    
    // Define allowed image formats to prevent malicious file uploads
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"]; 

    // Validate that the uploaded file is an accepted image type
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }

    // Extract blog content data from the request body
    const { title, category, about } = req.body; 

    // Validate that all required fields are provided
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" }); 
    }

    // Extract admin (author) information from the authenticated user object
    // These are added by the isAuthenticated middleware
    const adminName = req?.user?.name;          // Author's name
    const adminPhoto = req?.user?.photo?.url;   // Author's profile photo URL
    const createdBy = req?.user?._id;           // Author's MongoDB ObjectId

    // Upload blog image to Cloudinary cloud storage
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath  // Path to temporary file created by Express
    );
    
    // Check if Cloudinary upload was successful
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
    
    // Create the complete blog data object with all required fields
    const blogData = {
      title,                  // Blog title
      about,                  // Blog content
      category,               // Blog category
      adminName,              // Author name
      adminPhoto,             // Author profile photo URL
      createdBy,              // Reference to author's user ID
      blogImage: {            // Blog featured image information
        public_id: cloudinaryResponse.public_id,  // Cloudinary reference ID
        url: cloudinaryResponse.url,              // Public URL to the image
      },
    };

    // Save the blog to the database using the Blog model's create method
    const blog = await Blog.create(blogData);

    // Send success response with the created blog object
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    // Log any errors and send a generic error response
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

/**
 * Delete Blog Controller
 * 
 * Removes a specific blog post by ID.
 * Requires authentication and admin privileges (enforced in routes).
 * 
 * @param {object} req - Express request with blog ID in params
 * @param {object} res - Express response for sending back status and message
 */
export const deleteBlog = async (req, res) => {
  // Extract the blog ID from request parameters
  const { id } = req.params;
  
  // Validate that the ID is a valid MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  
  // Find the blog by ID and delete it
  const deletedBlog = await Blog.findByIdAndDelete(id);
  
  // If no blog was found with that ID, return 404 Not Found
  if (!deletedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  
  // Send success response
  res.status(200).json({ message: "Blog deleted successfully" });
};

/**
 * Get All Blogs Controller
 * 
 * Retrieves all blog posts in the database.
 * This is a public endpoint (no authentication required).
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response for sending back blogs data
 */
export const getAllBlogs = async (req, res) => {
  // Find all blogs in the database
  const allBlogs = await Blog.find();
  
  // Return the array of all blogs
  res.status(200).json(allBlogs);
};

/**
 * Get Single Blog Controller
 * 
 * Retrieves a specific blog post by ID.
 * Requires authentication (enforced in routes).
 * 
 * @param {object} req - Express request with blog ID in params
 * @param {object} res - Express response for sending back blog data
 */
export const getSingleBlogs = async (req, res) => {
  // Extract the blog ID from request parameters
  const { id } = req.params;
  
  // Validate that the ID is a valid MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  
  // Find the blog by ID
  const blog = await Blog.findById(id);
  
  // If no blog was found with that ID, return 404 Not Found
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  
  // Return the found blog object
  res.status(200).json(blog);
};

/**
 * Get My Blogs Controller
 * 
 * Retrieves all blogs created by the currently authenticated user.
 * Requires authentication and admin role (enforced in routes).
 * 
 * @param {object} req - Express request with user object attached by middleware
 * @param {object} res - Express response for sending back user's blogs
 */
export const getMyBlogs = async (req, res) => {
  // Get the user ID from the authenticated user object
  const createdBy = req.user._id;
  
  // Find all blogs where createdBy matches the current user's ID
  const myBlogs = await Blog.find({ createdBy });
  
  // Return the array of user's blogs
  res.status(200).json(myBlogs);
};

/**
 * Update Blog Controller
 * 
 * Updates a specific blog post by ID.
 * Requires authentication and admin privileges (enforced in routes).
 * 
 * @param {object} req - Express request with blog ID in params and update data in body
 * @param {object} res - Express response for sending back updated blog
 */
export const updateBlog = async (req, res) => {
  // Extract the blog ID from request parameters
  const { id } = req.params;
  
  // Validate that the ID is a valid MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  
  // Find the blog by ID and update it with data from request body
  // The {new: true} option returns the updated document rather than the original
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  
  // If no blog was found with that ID, return 404 Not Found
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  
  // Return the updated blog object
  res.status(200).json(updatedBlog);
};

