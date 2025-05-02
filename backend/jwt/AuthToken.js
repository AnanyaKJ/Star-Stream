// Import the jsonwebtoken library for creating and verifying JWT tokens
import jwt from "jsonwebtoken";

// Import the User model to update the user's token in the database
import { User } from "../models/user.model.js";

/**
 * Creates a JWT token for user authentication, saves it as an HTTP-only cookie,
 * and updates the user document in the database with the token
 * 
 * @param {string} userId - MongoDB ObjectId of the authenticated user
 * @param {object} res - Express response object to set cookies
 * @returns {string} - The generated JWT token
 */
const createTokenAndSaveCookies = async (userId, res) => {
  // Create a new JWT token containing the userId as payload
  // The token is signed using the JWT_SECRET_KEY from environment variables
  // This signature ensures the token cannot be tampered with
  const token = jwt.sign(
    { userId },               // Payload: data embedded in the token
    process.env.JWT_SECRET_KEY, // Secret key used for signing
    {
      expiresIn: "30d",      // Token validity period (30 days)
    }
  );

  // Set the token as an HTTP-only cookie in the response
  res.cookie("jwt", token, {
    httpOnly: true,  // Prevents JavaScript access to the cookie (XSS protection)
                     // Comment indicates this may be temporarily set to false for testing
    secure: false,   // Cookie not requiring HTTPS (would be true in production)
    sameSite: "lax", // Controls when cookies are sent with cross-site requests
                     // "lax" allows cookies on same-site requests and top-level navigation
    path: "/",       // Cookie is available throughout the entire site
  });

  // Update the user document in the database with the new token
  // This allows tracking active sessions and enables token invalidation
  await User.findByIdAndUpdate(userId, { token });

  // Return the token (may be used by the calling function)
  return token;
};

// Export the function to be used in authentication-related controllers
export default createTokenAndSaveCookies;
