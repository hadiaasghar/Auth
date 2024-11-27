import React, { useState } from "react";
import toast from 'react-hot-toast';
const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(false);
   const consoleClick =(e)=>{
    e.preventDefault();
    if(!email||!password){
      setError(true);
      toast.error("enter all the filds");
    }else{
      toast.success("successfully enter all the filds",{icon:"🎉🎉"});
      setError(false);
      
    }
    console.log(email,password)
    setEmail("");
    setPassword("");


   }
   setTimeout(()=>{

    setError(false);
   },3000)
  
  return (
    <>
      <div className="flex items-center min-h-screen justify-center bg-gray-100">
        <form className="border rounded-lg shadow-md flex flex-col w-full max-w-sm sm:w-[50%] lg:w-[30%] bg-white p-6">
          
          <h1 className="text-2xl text-center mb-6 font-semibold text-gray-800">Login</h1>

          {/* Email Input */}
          <div className="flex flex-col mb-4">

            <label htmlFor="email" className="form-label text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              placeholder="Enter email"
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="border border-gray-300 h-11 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="form-label text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="border border-gray-300 h-11 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         {error && <p className="text-red-500">plx enter all the fields</p>}
         

          {/* Submit Button */}
          <button onClick={consoleClick}
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300" 
          >
            Login
          </button>
          <div className="text-center justify-center flex flex-row mt-3">
            <p className="">dont have an account?</p>
            <button>rigister</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
