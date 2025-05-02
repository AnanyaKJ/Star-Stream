// Import required dependencies
import axios from "axios";                                     // HTTP client for making API requests
import React, { createContext, useContext, useEffect, useState } from "react"; // React and hooks

// Create a new Context for authentication state
// This will be used to share authentication data across the component tree
export const AuthContext = createContext();

/**
 * Authentication Provider Component
 * 
 * This component manages authentication state and provides it to the entire application.
 * It fetches user profile data and blog posts on initial render and makes them available
 * to all child components.
 * 
 * @param {object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to auth context
 */
export const AuthProvider = ({ children }) => {
  // State to store all blog posts
  const [blogs, setBlogs] = useState();
  
  // State to store the authenticated user's profile information
  const [profile, setProfile] = useState();
  
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect hook to fetch data when component mounts
  useEffect(() => {
    /**
     * Fetch the user's profile data from the API
     * Sets authentication state based on whether a valid profile is retrieved
     */
    const fetchProfile = async () => {
      try {
        // Retrieve JWT token from localStorage
        // Note: The comment suggests this should be 'let' because it can change with each login
        let token = localStorage.getItem("jwt");
        console.log(token);
        
        // Only proceed with the API request if a token exists
        if (token) {
          // Make authenticated request to get user profile
          const { data } = await axios.get(
            "http://localhost:4001/api/users/my-profile",
            {
              withCredentials: true,                  // Include cookies in the request
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,     // Include token in Authorization header
              },
            }
          );
          
          // Log the user data for debugging
          console.log(data.user);
          
          // Update state with user profile
          setProfile(data.user);
          
          // Set authentication status to true
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Log any errors during profile fetching
        console.log(error);
        // Note: No authentication state reset on error - this could be improved
      }
    };

    /**
     * Fetch all blog posts from the API
     * This doesn't require authentication as blogs are publicly viewable
     */
    const fetchBlogs = async () => {
      try {
        // Make request to get all blog posts
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs",
          { withCredentials: true }   // Include cookies in the request
        );
        
        // Log the blog data for debugging
        console.log(data);
        
        // Update state with blog posts
        setBlogs(data);
      } catch (error) {
        // Log any errors during blog fetching
        console.log(error);
      }
    };

    // Execute both fetch functions when component mounts
    fetchBlogs();
    fetchProfile();
  }, []); // Empty dependency array means this runs once on mount

  // Provide authentication context to all child components
  return (
    <AuthContext.Provider
      value={{
        blogs,                 // All blog posts
        profile,               // User profile data
        setProfile,            // Function to update profile
        isAuthenticated,       // Authentication status
        setIsAuthenticated,    // Function to update authentication status
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the authentication context
 * This allows components to easily access authentication state
 * without having to use useContext(AuthContext) directly
 */
export const useAuth = () => useContext(AuthContext);
