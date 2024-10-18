'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function Signup() {
const router = useRouter();
const [user, setUser] = React.useState({
  username:"",
  email:"",
  password:"",
})
const login = '/home/login';

const [buttonDisabled, setButtonDisabled] = useState(false);

const [loading, setLoading] = useState(false)

    // Placeholder for the signup logic
    const onSignup = async () => {
      try {
          setLoading(true);
          const res = await axios.post('/api/users/signup', user);
          console.log("SIgnup success", res.data);
          router.push("/roles");
      } catch (error) {
          console.error("Signup error:", error);
          toast.error(error.message)
      } finally {
          setLoading(false)
      }
  };

  useEffect(() =>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-2xl font-bold mb-4">{loading ? "processing..." : "Signup"}</h1>
    <label htmlFor="username" className="text-lg mb-2">Username</label>
    <input 
        className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
    />
    <label htmlFor="email" className="text-lg mb-2">Email</label>
    <input 
        className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
    />
    <label htmlFor="password" className="text-lg mb-2">Password</label>
    <input 
        className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
    />
    <button onClick={onSignup} className={`px-4 py-2 ${buttonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'} text-white rounded transition duration-300 ml-100`} disabled={buttonDisabled}>
        {buttonDisabled ? "No Signup" : "Sign Up"}
    </button>
    <Link href={login}>Already signed up? Log in here</Link>
</div>
  );
}
