import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold text-white mb-4">Design to Code</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Figma Plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Templates
                </a>
              </li>
            </ul>
            <img src="/logo.png" alt="Logo" className="mt-4 mx-auto w-50 h-40" />
          </div>
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold text-white mb-4">Products</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Flutter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  iOS
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold text-white mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Creators
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold text-white mb-4">Comparison</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Feature Comparison
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Pricing Comparison
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-300">
                  Performance Comparison
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="w-full flex justify-between items-center bg-gray-800 py-4">
        <div className="text-lg text-white text-center w-full">
          &copy; 2024 Ananya K.J | All rights reserved
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/AnanyaKJ" target="_blank" rel="noopener noreferrer">
            <FaGithub className="h-8 w-8 text-white hover:text-gray-300" />
          </a>
          <a href="#">
            <BsYoutube className="h-8 w-8 text-white hover:text-red-500" />
          </a>
          <a href="https://www.linkedin.com/in/ananya-k-j/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="h-8 w-8 text-white hover:text-blue-400" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
