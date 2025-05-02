/**
 * Blog Model
 * 
 * This file defines the MongoDB schema for blog posts in the Star Stream application.
 * It uses Mongoose to create a structured document format that will be stored in the MongoDB database.
 * The schema includes fields for blog content, images, category, and references to the blog creator.
 */

import mongoose from "mongoose";

// Creating a new Mongoose schema for blog posts
const blogSchema = new mongoose.Schema({
  
  // Title of the blog post
  title: {
    type: String,  // Data type is string
    required: true,  // This field is mandatory
  },

  // Blog featured image information stored in Cloudinary
  blogImage: {
    public_id: {
      type: String,  // Cloudinary public ID for the image
      required: true,  // This field is mandatory
    },
    url: {
      type: String,  // URL where the image is accessible
      required: true,  // This field is mandatory
    },
  },
  
  // Category the blog belongs to (e.g., Technology, Fashion, NIE, etc.)
  category: {
    type: String,
    required: true,  // This field is mandatory
  },
  
  // Main content of the blog post
  about: {
    type: String,
    required: true,  // This field is mandatory
    minlength: [200, "Should contain at least 200 characters!"],  // Validation constraint with error message
  },
  
  // Admin (author) name displayed with the blog
  // This is likely duplicated from the User model for quick access without joins
  adminName: {
    type: String,
  },
  
  // Admin (author) profile photo URL
  // This is likely duplicated from the User model for quick access without joins
  adminPhoto: {
    type: String,
  },
  
  // Reference to the User who created this blog post
  // This creates a relationship between the Blog and User collections
  createdBy: {
    type: mongoose.Schema.ObjectId,  // MongoDB ObjectId type
    ref: "User",  // References the User model
  },
});

// Creating and exporting the Blog model from the schema
// The first parameter "Blog" defines the collection name (will be "blogs" in MongoDB)
export const Blog = mongoose.model("Blog", blogSchema);
