import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message || "Please fill the required fields");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/starnightbg.jpg')" }}
    >
      <div className="w-full max-w-md bg-black text-white shadow-md rounded-lg p-8">
        <div className="text-center mb-6">
          <img src="/logo1.png" alt="Logo" className="mx-auto mb-4" style={{ width: '190px', height: '50px' }} />
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md bg-black text-white placeholder-white"
            />
          </div>

          {/* --- CSS Changes Start Here --- */}
          {/* Changed email input: from bg-white text-black placeholder-gray-500 to bg-black text-white placeholder-white */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md bg-black text-white placeholder-white"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md bg-black text-white placeholder-white"
            />
          </div>

          {/* Changed password input: from bg-white text-black placeholder-gray-500 to bg-black text-white placeholder-white */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md bg-black text-white placeholder-white"
            />
          </div>
          {/* --- CSS Changes End Here --- */}

          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-md bg-black text-white"
            >
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 border rounded-md bg-black text-white"
            >
              <option value="">Select Your Profession</option>
              <option value="Student">Student</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Civil Engineer">Civil Engineer</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="Financial Analyst">Financial Analyst</option>
              <option value="Content Writer">Content Writer</option>
              <option value="Network Administrator">Network Administrator</option>
              <option value="Human Resources Manager">Human Resources Manager</option>
              <option value="Research Scientist">Research Scientist</option>
              <option value="Academic Advisor">Academic Advisor</option>
              <option value="Registrar">Registrar</option>
              <option value="Government Employee">Government Employee</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <div className="photo w-20 h-20 mr-4">
              <img
                src={photoPreview ? `${photoPreview}` : "photo"}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
            />
          </div>
          <p className="text-center mb-4">
            Already registered?{" "}
            <Link to={"/login"} className="text-purple-600">
              Login Now
            </Link>
          </p>
          <button
            type="submit"
            className="w-full p-2 bg-purple-500 hover:bg-blue-800 duration-300 rounded-md text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
