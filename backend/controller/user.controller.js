// Import the User model to interact with the users collection in MongoDB
import { User } from "../models/user.model.js";

// Import Cloudinary's v2 API for handling image uploads
//v2 means version2 obj of the cloudinary imported as cloudinary
import { v2 as cloudinary } from "cloudinary";

// Import bcryptjs for password hashing and comparison
import bcrypt from "bcryptjs";

// Import custom function to handle JWT token creation and cookie storage
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

/**
 * User Registration Controller
 * 
 * Handles new user registration with profile photo upload to Cloudinary
 * and secure password storage.
 * 
 * @param {object} req - Express request object containing form data and files
 * @param {object} res - Express response object for sending back status and data
 */
export const register = async (req, res) => {
  try {
    // Check if a file was uploaded - profile photo is required
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }

    // Extract the photo from the uploaded files
    const { photo } = req.files;

    // Define allowed image formats to prevent malicious file uploads
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    
    // Validate that the uploaded file is an accepted image type
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }

    // Extract user information from request body
    const { email, name, password, phone, education, role } = req.body;

    // Validate that all required fields are provided
    if (
      !email ||
      !name ||
      !password ||
      !phone ||
      !education ||
      !role ||
      !photo
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    // Check if a user with the same email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Upload the profile photo to Cloudinary cloud storage
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    
    // Log any errors that occur during the Cloudinary upload
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    // Hash the password for secure storage - salt factor of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the provided information
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,  // Store Cloudinary reference ID
        url: cloudinaryResponse.url,              // Store public URL to the image
      },
    });

    // Save the new user to the database
    await newUser.save();

    // If user creation was successful, create and store authentication token
    if (newUser) {
      // Create JWT token and set as HTTP-only cookie
      let token = await createTokenAndSaveCookies(newUser._id, res);
      
      console.log("Singup: ", token);
      
      // Send success response with user details (excluding sensitive data)
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          education: newUser.education,
          avatar: newUser.avatar,       // Note: This field is not set in the newUser object
          createdOn: newUser.createdOn, // Note: This field is not defined in the schema
        },
        token: token,
      });
    }
  } catch (error) {
    // Log any errors and send a generic error response
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

/**
 * User Login Controller
 * 
 * Authenticates a user based on email, password, and role.
 * Creates a JWT token upon successful authentication.
 * 
 * @param {object} req - Express request object containing login credentials
 * @param {object} res - Express response object for sending back status and data
 */
export const login = async (req, res) => {
  // Extract credentials from request body
  const { email, password, role } = req.body;
  
  try {
    // Validate that all required fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    
    // Find the user by email and explicitly include password field
    // (password field has select:false in the schema, so it's not included by default)
    const user = await User.findOne({ email }).select("+password");
    
    console.log(user);
    
    // Verify the password exists in the found user record
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    // If user doesn't exist or password doesn't match, return error
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    // Verify that the user has the role they're trying to login with
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    
    // Create JWT token and set as HTTP-only cookie
    let token = await createTokenAndSaveCookies(user._id, res);
    
    console.log("Login: ", token);
    
    // Send success response with basic user details
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    // Log any errors and send a generic error response
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

/**
 * User Logout Controller
 * 
 * Ends the user session by clearing the JWT cookie.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie to end the session
    res.clearCookie("jwt");
    
    // Send success response
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    // Log any errors and send a generic error response
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

/**
 * Get User Profile Controller
 * 
 * Retrieves the profile information of the currently authenticated user.
 * Relies on the isAuthenticated middleware to attach user data to the request.
 * 
 * @param {object} req - Express request object with attached user data
 * @param {object} res - Express response object
 */
export const getMyProfile = async (req, res) => {
  // Get user data from the request object (added by isAuthenticated middleware)
  const user = await req.user;
  
  // Send the user data in the response
  res.status(200).json({ user });
};

/**
 * Get All Admins Controller
 * 
 * Retrieves all users with the "admin" role.
 * Used to display content creators/blog authors on the frontend.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getAdmins = async (req, res) => {
  // Query the database for all users with role "admin"
  const admins = await User.find({ role: "admin" });
  
  // Send the list of admins in the response
  res.status(200).json({ admins });
};
