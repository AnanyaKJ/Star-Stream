// Import Express framework to create a router
import express from "express";

// Import blog controller functions that contain the actual logic for each route
import {
  createBlog,    // Function to create a new blog post
  deleteBlog,    // Function to delete an existing blog post
  getAllBlogs,   // Function to retrieve all blog posts
  getMyBlogs,    // Function to retrieve blogs created by the authenticated user
  getSingleBlogs, // Function to retrieve a specific blog post by ID
  updateBlog,    // Function to update an existing blog post
} from "../controller/blog.controller.js";

// Import authentication and authorization middleware
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

// Create a new router instance
const router = express.Router();

// POST route to create a new blog post
// Requires:
// 1. Authentication (user must be logged in)
// 2. Authorization (user must have "admin" role)
router.post("/create", isAuthenticated, isAdmin("admin"), createBlog);

// DELETE route to remove a blog post by its ID
// The :id parameter in the URL will be available as req.params.id in the controller
// Requires authentication and admin role
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteBlog);

// GET route to retrieve all blog posts
// This is a public route (no authentication required)
// Anyone can view the list of all blogs
router.get("/all-blogs", getAllBlogs);

// GET route to retrieve a specific blog post by ID
// Requires authentication but no specific role
// Any authenticated user can view individual blog posts
router.get("/single-blog/:id", isAuthenticated, getSingleBlogs);

// GET route to retrieve blogs created by the currently authenticated user
// Requires both authentication and admin role
// This lets admins see only their own blog posts
router.get("/my-blog", isAuthenticated, isAdmin("admin"), getMyBlogs);

// PUT route to update an existing blog post by ID
// Requires authentication and admin role
// Only admins can update blog content
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);

// Export the router to be used in the main Express application
export default router;
