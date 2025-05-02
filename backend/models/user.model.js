/**
 * User Model
 * 
 * This file defines the MongoDB schema for users in the Star Stream application.
 * It uses Mongoose to create a structured document format for storing user information.
 * The schema includes fields for personal information, authentication, roles, and profile images.
 */

import mongoose from "mongoose";
import validator from "validator"; // Validator library for input validation

// Creating a new Mongoose schema for user accounts
const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,  // Data type is string
    required: true,  // This field is mandatory
  },
  
  // User's email address
  email: {
    type: String,  // Data type is string
    required: true,  // This field is mandatory
    unique: true,   // Emails must be unique across all users
    validate: [validator.isEmail, "Please enter a valid email"],  // Email format validation with error message
  },
  
  // User's phone number
  phone: {
    type: Number,  // Data type is number
    required: true,  // This field is mandatory
    unique: true,   // Phone numbers must be unique across all users
  },
  
  // User's profile photo information stored in Cloudinary
  photo: {
    public_id: {
      type: String,  // Cloudinary public ID for the image
      required: true,  // This field is mandatory
    },
    url: {
      type: String,  // URL where the image is accessible
      required: true,  // This field is mandatory
    },
  },
  
  // User's educational background
  education: {
    type: String,
    required: true,  // This field is mandatory
  },
  
  // User's role in the system - determines permissions
  role: {
    type: String,
    required: true,  // This field is mandatory
    enum: ["user", "admin"],  // Restricted to only these two possible values
  },
  
  // User's account password
  password: {
    type: String,
    required: true,  // This field is mandatory
    select: false,   // Excluded from query results by default for security
    minlength: 8,    // Minimum password length requirement
  },
  
  // Authentication token for maintaining user sessions
  token: {
    type: String,  // Stores JWT token
  },
  
  // Timestamp for when the user account was created
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set to current date/time when record is created
  },
});

// Creating and exporting the User model from the schema
// The first parameter "User" defines the collection name (will be "users" in MongoDB)
export const User = mongoose.model("User", userSchema);
