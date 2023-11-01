"use client";
import React, { useState } from "react";
import Link from "next/link";
import "font-awesome/css/font-awesome.min.css";
import useRegister from "../hooks/usePostUsers";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleRegister, loading, error, message } = useRegister();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const requiredFields = [
      "full_name",
      "email",
      "phone_number",
      "Bio",
      "Organization",
      "role",
      "password",
    ];
    const isFormValid = requiredFields.every((field) => formData.get(field));
    if (!isFormValid) {
      alert("Please fill in all required fields");
      return;
    }
    const registerData = {
      full_name: String(formData.get("full_name")),
      email: String(formData.get("email")),
      phone_number: String(formData.get("phone_number")),
      Bio: String(formData.get("Bio")),
      Organization: String(formData.get("Organization")),
      role: String(formData.get("role")),
      password: String(formData.get("password")),
    };
    try {
      const response = await handleRegister(registerData);
    } catch (error) {
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url('/Images/athletefield.jpg')] bg-cover"></div>
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-blue-600 opacity-60"></div>
      <div className="text-center mb-18 w-full h-[100vh] bg-blue-100 opacity-90 relative max-w-4xl">
        <h2 className="text-4xl mb-4 mt-2 ml-12 text-green-800 font-bold font-merriweather relative">Register To Amali</h2>
        <div className="text-red-500">{error}</div>
        <div className="text-green-800">{message}</div>
        <form onSubmit={handleFormSubmit} className="ml-64">
           <div className="text-left mt-2 font-merriweather relative">
             <label htmlFor="full_name" className="text-black mt-2 font-bold text-1xl">
               Full name
             </label>
             <div className="relative">
               <input
                type="text"
                id="full_name"
                name="full_name"
                className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md"
                placeholder="Enter full name"
              />
            </div>
          </div>
          <div className="text-left mt-2 font-merriweather relative">
            <label htmlFor="email" className="text-black font-bold text-1xl">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md"
                placeholder="Enter email"
                autoComplete="username"
              />
            </div>
          </div>
          <div className="text-left mt-2 font-merriweather relative">
            <label htmlFor="phone_number" className="text-black font-bold text-1xl">
              Phone number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md"
                placeholder="+254"
              />
            </div>
          </div>
          <div className="text-left mt-2 font-merriweather relative">
            <label htmlFor="Bio" className="text-black font-bold text-1xl">
              Bio
            </label>
            <div className="relative">
              <input
                type="text"
                id="Bio"
                name="Bio"
                className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md"
                placeholder="Enter bio"
              />
            </div>
          </div>
          <div className="text-left mt-2 font-merriweather relative">
            <label htmlFor="Organization" className="text-black font-bold text-1xl">
              Organization
            </label>
            <div className="relative">
              <input
                type="text"
                id="Organization"
                name="Organization"
                className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md"
                placeholder="Enter organization"
              />
            </div>
          </div>
          <div className="text-left mt-2 font-merriweather relative">
            <label htmlFor="role" className="text-black mt-2 font-bold text-1xl">
              Role
            </label>
            <div className="relative">
              <input
                type="text"
                id="role"
                name="role"
                className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md"
                placeholder="Enter role"
              />
            </div>
          </div>
          <div className="text-left mt-2 font-merriweather relative">
            <label htmlFor="password" className="text-black font-bold text-1xl">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md pr-10 pl-2"
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute right-6 top-3 transform text-black relative -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <i className="fa fa-eye"></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-800 text-white mr-52 py-3 px-20 rounded-md text-xl -mr-2 cursor-pointer mb-5 font-merriweather"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p className="text-2xl text-black font-merriweather text-black mr-64 mb-8">
            Already have an account?{" "}
            <Link href='/login'>
              <span className='text-green-700 font-bold'>Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
