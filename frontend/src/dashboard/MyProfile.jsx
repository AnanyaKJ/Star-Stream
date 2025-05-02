import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  console.log(profile);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }} // Set the background image
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        <div className="relative">
          <img
            src={profile.photo?.url}
            alt="avatar"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
            <img
              src={profile.photo?.url}
              alt="avatar"
              className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="text-center text-2xl font-bold mt-8">
            <p className="mb-4"></p> {/* Add a line space */}
            <p>{profile.name}</p> {/* Admin name on a new line */}
          </div>
          <p className="text-center text-gray-600">{profile.email}</p>
          <p className="text-center text-gray-600">Phone: {profile.phone}</p>
          <p className="text-center text-gray-600">Role: {profile.role}</p>
          <p className="text-center text-gray-600">Education: {profile.education}</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
