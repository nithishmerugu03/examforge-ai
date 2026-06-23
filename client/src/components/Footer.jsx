import React from "react";
import { motion } from "motion/react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function Footer() {
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
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="z-10 mx-6 mb-6 mt-12 rounded-xl border border-white/10
      bg-gradient-to-br from-zinc-950/95 via-zinc-900/90 to-neutral-950/95
      px-8 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start">
        <motion.div
          whileHover={{ rotateX: 4, rotateY: -4 }}
          className="flex transform-gpu flex-col gap-4"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="flex cursor-pointer items-center gap-3"
            style={{ transform: "translateZ(20px)" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="ExamForge AI" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-lg font-semibold text-white">
              ExamForge <span className="text-gray-400">AI</span>
            </span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-gray-300">
            Create exam-focused notes, project material, diagrams, and printable
            PDFs with a workflow designed for fast revision.
          </p>
        </motion.div>

        <div className="md:text-center">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <FooterLink onClick={() => navigate("/notes")}>Notes</FooterLink>
            <FooterLink onClick={() => navigate("/history")}>History</FooterLink>
            <FooterLink onClick={() => navigate("/pricing")}>Add Credits</FooterLink>
          </ul>
        </div>

        <div className="md:text-center">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
            Account
          </h2>
          <ul className="space-y-2 text-sm">
            <FooterLink onClick={() => navigate("/auth")}>Sign In</FooterLink>
            <FooterLink red onClick={handleSignOut}>
              Sign Out
            </FooterLink>
            <li className="text-gray-300">support@examforge.com</li>
          </ul>
        </div>
      </div>

      <div className="my-6 h-px bg-white/10" />
      <p className="text-center text-xs text-gray-500">
        Copyright {new Date().getFullYear()} ExamForge AI. All rights reserved.
      </p>
    </motion.footer>
  );
}

function FooterLink({ children, onClick, red }) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer transition-colors ${
        red ? "text-red-400 hover:text-red-300" : "text-gray-300 hover:text-white"
      }`}
    >
      {children}
    </li>
  );
}

export default Footer;
