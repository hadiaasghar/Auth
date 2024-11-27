import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Singup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [error, setError] = useState(false);

  const consoleClick = (e) => {
    e.preventDefault();

    
    setError(false);
    setPasswordMatch(false);

    if (!email || !password || !name || !confirmpass) {
      setError(true);
      toast.error("Please enter all the fields");
    } else if (password !== confirmpass) {
      setPasswordMatch(true);
      toast.error("Passwords do not match");
      
      setTimeout(() => {
        setPasswordMatch(false);
      }, 3000);
    } else {
      toast.success("Successfully entered all the fields", { icon: "🎉🎉" });
      setError(false);
      setPasswordMatch(false);

      
      setEmail("");
      setPassword("");
      setName("");
      setConfirmpass("");
    }

    console.log(email, password, name, confirmpass);
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-gray-100">
      <form className="border rounded-lg shadow-md flex flex-col w-full max-w-sm sm:w-[50%] lg:w-[30%] bg-white p-6">
        <h1 className="text-2xl text-center mb-6 font-semibold text-gray-800">SignUp</h1>

        {/* Name Input */}
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="form-label text-gray-700 font-medium mb-2">Name</label>
          <input
            id="name"
            placeholder="Enter your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 h-11 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="form-label text-gray-700 font-medium mb-2">Email</label>
          <input
            id="email"
            placeholder="Enter email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 h-11 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col mb-4 relative">
          <label htmlFor="password" className="form-label text-gray-700 font-medium mb-2">Password</label>
          <input
            id="password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 h-11 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute top-12 right-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col mb-4 relative">
          <label htmlFor="confirmpassword" className="form-label text-gray-700 font-medium mb-2">Confirm Password</label>
          <input
            id="confirmpassword"
            placeholder="Enter confirm password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)}
            className="border border-gray-300 h-11 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute top-12 right-3 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
          </button>
        </div>

        {/* Error Messages */}
        {error && <p className="text-red-500">Please enter all the fields.</p>}
        {passwordMatch && <p className="text-red-500">Passwords do not match.</p>}

        {/* Submit Button */}
        <button
          onClick={consoleClick}
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>

        <div className="text-center justify-center flex flex-row mt-3">
          <p>Already have an account?</p>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Singup;
