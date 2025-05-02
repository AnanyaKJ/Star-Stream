// Import required packages for the Express server
import express from "express";               // Web application framework
import dotenv from "dotenv";                 // Environment variable management
import mongoose from "mongoose";             // MongoDB ODM (Object Document Mapper)
import fileUpload from "express-fileupload"; // Middleware for handling file uploads
import { v2 as cloudinary } from "cloudinary"; // Cloud storage for images
import cookieParser from "cookie-parser";    // Middleware to parse cookies
import userRoute from "./routes/user.route.js"; // User-related route definitions
import blogRoute from "./routes/blog.route.js"; // Blog-related route definitions
import cors from "cors";                     // Cross-Origin Resource Sharing middleware

// Initialize Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set up server port - use environment variable or default to 3000
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Get MongoDB connection string from environment variables
const MONOGO_URL = process.env.MONOG_URI;  // Note: There's a typo here (MONOG_URI)

// Middleware Setup
// Parse JSON request bodies
app.use(express.json());

// Parse cookies from request headers
app.use(cookieParser());

// Configure CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,  // Allow requests only from the frontend URL
    credentials: true,                 // Allow cookies to be sent with cross-origin requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  })
);

// Configure file upload middleware
app.use(
  fileUpload({
    useTempFiles: true,      // Store uploaded files in temporary directory
    tempFileDir: "/tmp/",    // Temporary directory path
  })
);

// Database Connection
try {
  // Connect to MongoDB using the connection string from .env
  mongoose.connect(MONOGO_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  // Log any connection errors
  console.log(error);
}

// Route Definitions
// All user-related endpoints will be prefixed with /api/users
app.use("/api/users", userRoute);

// All blog-related endpoints will be prefixed with /api/blogs
app.use("/api/blogs", blogRoute);

// Cloudinary Configuration
// Set up the connection to Cloudinary using credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,     // Cloudinary account name
  api_key: process.env.CLOUD_API_KEY,     // API key for authentication
  api_secret: process.env.CLOUD_SECRET_KEY, // Secret key for secure operations
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
