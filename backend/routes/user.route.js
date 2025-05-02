// Import Express framework to create a router
import express from "express";

// Import user controller functions that handle the logic for each route
import {
  getAdmins,     // Function to retrieve all admin users 
  getMyProfile,  // Function to retrieve the current user's profile
  login,         // Function to authenticate a user and create a session
  logout,        // Function to end a user's session
  register,      // Function to create a new user account
} from "../controller/user.controller.js";

// Import authentication middleware
import { isAuthenticated } from "../middleware/authUser.js";

// Create a new router instance
const router = express.Router();

// POST route to register a new user
// This is a public route - anyone can create a new account
router.post("/register", register);

// POST route to authenticate a user and start a session
// This is a public route - users need to log in to get authenticated
router.post("/login", login);

// GET route to log out a user and clear their session
// Protected by authentication - only logged-in users can log out
router.get("/logout", isAuthenticated, logout);

// GET route to retrieve the current user's profile information
// Protected by authentication - users can only access their own profile
router.get("/my-profile", isAuthenticated, getMyProfile);

// GET route to retrieve all admin users
// This appears to be a public route - anyone can see the list of admins
// This is likely for displaying content creator information publicly
router.get("/admins", getAdmins);

// Export the router to be used in the main Express application
export default router;
