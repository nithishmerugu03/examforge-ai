import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth() {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("Firebase signInWithPopup response:", response);
      const User = response.user;
      const name = User.displayName;
      const email = User.email;
      try {
        const result = await axios.post(serverUrl + "/api/auth/google", { name, email },{
          withCredentials: true
        });
        dispatch(setUserData(result.data))
      } catch (postErr) {
        console.error("Failed to POST to server (is backend running?):", postErr);
        alert("Sign-in succeeded but server is unreachable. Start the backend on port 5000.");
      }

    } catch (error) {
      console.error("Google Sign-In error:", error);
      alert("Google Sign-In failed. Check console for details.");
    }
  }
  return (
    <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
      <motion.header 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative z-10 max-w-7xl mx-auto mt-8 
      rounded-2xl 
      bg-gradient-to-r from-indigo-700/80 via-purple-700/70 to-pink-600/60 
      text-white backdrop-blur-md ring-1 ring-white/10 px-8 py-4 
      shadow-xl">
        <h1 className="text-xl font-bold mb-2">ExamForge AI</h1>
        <p className="text-base mb-3">Your AI-powered exam generator. Create custom notes in seconds.</p>
      </motion.header>
      <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>

          {/* Left side */}
          <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className='space-y-6'>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
              Unlock Smart<br/> AI Notes
            </h1>
            <motion.button
              onClick={handleGoogleAuth}
              whileHover={{ y: -10, scale: 1.07 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              whileTap={{ scale: 0.97 }}
            className="mt-10 px-10 py-3 rounded-xl
            flex items-center gap-3 
            bg-gradient-to-br from-black/90 via-black/80 to-black/90 
            border border-white/10
            text-white font-semibold text-lg
            shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
              <FcGoogle size={22}/>
              Continue with Google
            </motion.button>
            <p className="mt6 max-w-md text-lg
              bg-gradient-to-br from-gray-700 via-gray-500/80 to-grey-700
              bg-clip-text text-transparent">
              You get<span className="font-semibold"> 50 FREE credits</span> to create exam notes,project notes,charts,graphs and download clean PDFs  instantly using AI.</p>
              <p className="mt-4 text-sm text-gray-500"> Start with 50 free credits , Upgrade anytime for more credits , Instant access</p>
          </motion.div>

          {/* Right side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Feature
              icon="🎁"
              title="50 FREE Credits"
              description="Start with 50 free credits to create AI-generated notes without any cost."
              />
              <Feature
              icon="📒"
              title="Exam Notes"
              description="High-quality, AI-generated exam notes tailored to your specific subjects and topics."
              />
              <Feature
              icon="📂"
              title="Project Notes"
              description="Well-organized project notes that help you keep track of your work and ideas."
              />
              <Feature
              icon="📊"
              title="Charts & Graphs"
              description="Auto-generated charts and graphs to visually represent data and concepts in your notes."
              />
              <Feature
              icon="⬇️"
              title="Free PDF Downloads"
              description="Download your AI-generated notes as clean, well-formatted PDFs for easy access and sharing."
              />
          </div>
      </main>
    </div>
  )
}

function Feature({icon, title, description}) {
  return (
    <motion.div 
    whileHover={{ y: -8, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="relative rounded-2xl p-6
    bg-gradient-to-br from-black/90 via-black/80 to-black/90
    backdrop-blur-2xl
    border border-white/10
    shadow-[0_30px_80px_rgba(0,0,0,0.7)]
    text-white"
    >
        <div className='relative z-10'>
          <div className="text-4xl mb-3">{icon}</div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
        </div>
    </motion.div>
  )
}

export default Auth
