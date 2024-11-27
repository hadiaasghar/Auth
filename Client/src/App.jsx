import React from 'react'
import Login from './Components/Login/Login'
import  { Toaster } from 'react-hot-toast';
import Singup from './Components/Signup/Singup';

const App = () => {
  return (
    <div>
      {/* <Login/> */}
      <Singup/>
      <Toaster/>
      
    </div>
  )
}

export default App
