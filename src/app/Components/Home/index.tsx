"use client"
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const userLoggedIn = Boolean(Cookies.get('sessionToken'));
    setLoading(false);
    if (userLoggedIn) {
      setIsUserLoggedIn(userLoggedIn);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000)
    } else
      setTimeout(() => {
        router.push('/login');
      }, 4000);
  }, [router]);

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('/Images/Eliudkip.png')`, 
      }}
    >
      <div className="text-white text-center">

        <h1 className="text-8xl font-bold my-6 font-merriweather">Welcome to Amali Portal</h1>
        <p className="text-5xl mb-8 font-merriweathe">Track Your Sponsorship Progress</p>

        <div className="flex justify-center items-center space-x-12">
          <a href="/registration" className="border border-white text-white py-6 px-8 w-72 rounded-lg text-xl font-semibold transition duration-300 transform hover:scale-105 font-merriweathe">Sign Up</a>
          <a href="/login" className="border border-white text-white py-6 px-8 w-72 rounded-lg text-xl font-semibold transition duration-300 transform hover:scale-105 font-merriweathe">Sign In</a>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;