"use client"
import React, { useState } from "react";
import Link from "next/link";
import "font-awesome/css/font-awesome.min.css";
import useLogin from "../hooks/useGetLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, loading, message, error } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    const loginData = {
      email: String(email),
      password: String(password),
    };

    try {
      const response = await handleLogin(loginData);
    } catch (error) {
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url('/Images/athletefield.jpg')] bg-cover"></div>
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-blue-600 opacity-60"></div>
      <div className="text-center mb-18 w-full h-[100vh] bg-blue-100 opacity-90 relative max-w-4xl">
        <h2 className="text-4xl mb-4 mt-2 ml-12 text-green-800 font-bold font-merriweather relative">Sign In</h2>
        <div className="text-red-500">{error}</div>
        <div className="text-green-800">{message}</div>
        <form onSubmit={handleFormSubmit} className="ml-64">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <p className="text-2xl text-black font-merriweather text-black mr-64 mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/registration">
              <span className="text-green-700 text-xl font-bold">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;









// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import "font-awesome/css/font-awesome.min.css";
// import useLogin from "../hooks/useGetLogin";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { handleLogin, loading, message, error } = useLogin();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleFormSubmit = async (event: any) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     if (!email || !password) {
//       alert("Please fill in both email and password fields.");
//       return;
//     }

//     const loginData = {
//       email: String(email),
//       password: String(password),
//     };

//     try {
//       const response = await handleLogin(loginData);
//     } catch (error) {
//     }
//   };
//   return (
//     <div className="flex justify-center items-center">
//       <div className="fixed top-0 left-0 w-screen h-screen bg-[url('/Images/athletefield.jpg')] bg-cover"></div>
//       <div className="absolute top-0 left-0 w-full h-[100vh] bg-blue-600 opacity-60"></div>
//       <div className="text-center mb-18 w-full h-[100vh] bg-blue-100 opacity-90 relative max-w-4xl">
//         <h2 className="text-4xl mb-4 mt-2 ml-12 text-green-800 font-bold font-merriweather relative">Sign In</h2>
//         <div className="text-red-500">{error}</div>
//         <div className="text-green-800">{message}</div>
//         <form onSubmit={handleFormSubmit} className="ml-64">
//           <div className="text-left mt-2 font-merriweather relative">
//             <label htmlFor="email" className="text-black font-bold text-1xl">
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md"
//                 placeholder="Enter email"
//                 autoComplete="username"
//               />
//             </div>
//           </div>
//           <div className="text-left mt-2 font-merriweather relative">
//             <label htmlFor="password" className="text-black font-bold text-1xl">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 className="w-[420px] h-[4vh] text-black px-1 py-3 mb-5 border border-gray-400 rounded-md pr-10 pl-2"
//                 placeholder="Enter password"
//                 autoComplete="current-password"
//               />
//               <button
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-6 top-3 transform text-black relative -translate-y-1/2 cursor-pointer"
//               >
//                 {showPassword ? (
//                   <i className="fa fa-eye"></i>
//                 ) : (
//                   <i className="fa fa-eye-slash"></i>
//                 )}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-green-800 text-white mr-52 py-3 px-20 rounded-md text-xl -mr-2 cursor-pointer mb-5 font-merriweather"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Sign In"}
//           </button>
//           <p className="text-2xl text-black font-merriweather text-black mr-64 mb-8">
//             Don't have an account?{" "}
//             <Link href="/registration">
//               <span className="text-green-700 text-xl font-bold">Sign Up</span>
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;








