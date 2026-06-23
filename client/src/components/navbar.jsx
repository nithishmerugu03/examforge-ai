import React from "react";
import { AnimatePresence, motion } from "motion/react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { FaGem, FaPlus, FaUser } from "react-icons/fa";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 50;
  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative z-20 mx-6 mt-6 rounded-xl border border-white/10
      bg-gradient-to-br from-zinc-950/95 via-zinc-900/90 to-neutral-950/95
      px-6 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl
      flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <img src={logo} alt="examnotes" className="h-9 w-9 rounded-full" />
        <span className="hidden text-lg font-semibold text-white md:block">
          ExamForge <span className="text-gray-400">AI</span>
        </span>
      </div>

      <div className="relative flex items-center gap-4">
        <div className="relative">
          <motion.div
            onClick={() => {
              setShowCredits(!showCredits);
              setShowProfile(false);
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15
            bg-white/10 px-3 py-2 text-sm text-white shadow-sm transition-colors hover:bg-white/15"
          >
            <FaGem className="text-sm text-sky-300" />
            <span className="font-semibold">{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-1 flex h-5 w-5 items-center justify-center rounded-full
              bg-white text-xs font-bold text-zinc-900"
            >
              <FaPlus className="text-[10px]" />
            </motion.span>
          </motion.div>

          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-[-50px] mt-4 w-64 rounded-xl border border-white/10
                bg-zinc-950/95 p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                backdrop-blur-xl"
              >
                <h4 className="mb-2 font-semibold">Add Credits</h4>
                <p className="mb-4 text-sm leading-relaxed text-gray-300">
                  Use credits to create notes, diagrams, and clean PDF exports.
                </p>
                <button
                  onClick={() => {
                    setShowCredits(false);
                    navigate("/pricing");
                  }}
                  className="w-full rounded-lg bg-white py-2.5 font-semibold text-zinc-950
                  transition-colors hover:bg-gray-200"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <motion.div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredits(false);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
            border border-white/15 bg-white/10 text-sm text-white shadow-sm transition-colors hover:bg-white/15"
          >
            {userData?.name ? (
              <span className="text-base font-semibold">
                {userData.name.slice(0, 1).toUpperCase()}
              </span>
            ) : (
              <FaUser className="text-sm text-gray-300" />
            )}
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-4 w-52 rounded-xl border border-white/10
                bg-zinc-950/95 p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                backdrop-blur-xl"
              >
                <MenuItem
                  text="History"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/history");
                  }}
                />
                <div className="mx-3 h-px bg-white/10" />
                <MenuItem text="Sign Out" red onClick={handleSignOut} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`w-full cursor-pointer rounded-lg px-5 py-3 text-left text-sm transition-colors ${
        red
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-200 hover:bg-white/10"
      }`}
    >
      {text}
    </div>
  );
}

export default Navbar;
