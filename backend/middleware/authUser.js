// Import the User model for querying user data from the database
import { User } from "../models/user.model.js";

// Import jsonwebtoken library for verifying JWT tokens
import jwt from "jsonwebtoken";

/**
 * Authentication Middleware
 * 
 * This middleware verifies if a user is authenticated by checking the JWT token in cookies.
 * It extracts user information and attaches it to the request object for use in route handlers.
 * 
 * @param {object} req - Express request object containing cookies and other request data
 * @param {object} res - Express response object for sending responses if authentication fails
 * @param {function} next - Express next middleware function to continue the request chain
 */
export const isAuthenticated = async (req, res, next) => {
  try {
    // Extract the JWT token from cookies
    const token = req.cookies.jwt;
    
    // Log the token for debugging purposes
    console.log("Middleware : ", token);
    
    // If no token exists in cookies, return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    
    // Verify the token's authenticity using the secret key
    // If the token is invalid or expired, this will throw an error caught by the catch block
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Find the user in the database using the userId from the decoded token
    const user = await User.findById(decoded.userId);
    
    // If no user found with that ID, return 404 Not Found response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Attach the user object to the request for use in subsequent middleware or route handlers
    // This makes user data available without needing to query the database again
    req.user = user;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Log any errors that occur during authentication
    console.log("Error occuring in Authentication: " + error);
    
    // Return 401 Unauthorized for any errors (token invalid, expired, etc.)
    return res.status(401).json({ error: "User not authenticated" });
  }
};

/**
 * Authorization Middleware Factory
 * 
 * Creates middleware that checks if the authenticated user has the required role.
 * Uses the isAuthenticated middleware as a prerequisite.
 * 
 * @param {...string} roles - List of roles that are authorized to access the route
 * @returns {function} - Express middleware function that handles authorization
 */
export const isAdmin = (...roles) => {
  // Return middleware function that checks user role
  return (req, res, next) => {
    // Check if user's role is included in the allowed roles array
    // The req.user object must be set by isAuthenticated middleware before this runs
    if (!roles.includes(req.user.role)) {
      // If user role is not allowed, return 403 Forbidden response
      return res
        .status(403)
        .json({ error: `User with given role ${req.user.role} not allowed` });
    }
    
    // Role is authorized, continue to the next middleware or route handler
    next();
  };
};
