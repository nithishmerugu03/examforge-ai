import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import img from "../assets/img1.png";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaChartLine, FaFilePdf, FaFolderOpen } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <Navbar />

      <section
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16
        px-8 pb-16 pt-28 lg:grid-cols-2 lg:pt-32"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 4, rotateY: -4 }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              className="text-5xl font-extrabold leading-tight text-zinc-900 lg:text-6xl"
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 16px 34px rgba(0,0,0,0.16)",
              }}
            >
              Create Smart
              <br /> AI Notes in Seconds
            </motion.h1>
            <motion.p
              whileHover={{ y: -2 }}
              className="mt-6 max-w-xl text-base leading-7 text-zinc-600 lg:text-lg"
              style={{ transform: "translateZ(40px)" }}
            >
              Generate exam-ready notes, project documentation, diagrams, and
              revision material with a cleaner workflow powered by AI.
            </motion.p>
            <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{ y: -7, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              whileTap={{ scale: 0.97 }}
              className="mt-9 rounded-xl border border-zinc-900/10 bg-zinc-950
              px-8 py-3 text-base font-semibold text-white
              shadow-[0_18px_40px_rgba(0,0,0,0.24)] transition-colors hover:bg-zinc-800"
            >
              Start Creating
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -10, rotateX: 4, rotateY: -4, scale: 1.03 }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="overflow-hidden">
            <img
              src={img}
              alt="Students creating notes"
              className="mx-auto w-full max-w-xl"
              style={{ transform: "translateZ(35px)" }}
            />
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-8 py-24 md:grid-cols-4">
        <Feature
          icon={<FaBookOpen />}
          title="Exam Notes"
          description="Focused notes with the key points you need for revision."
        />
        <Feature
          icon={<FaFolderOpen />}
          title="Project Notes"
          description="Structured content for assignments, reports, and projects."
        />
        <Feature
          icon={<FaChartLine />}
          title="Diagrams"
          description="Generate visual explanations that make concepts easier to read."
        />
        <Feature
          icon={<FaFilePdf />}
          title="PDF Export"
          description="Download neat, printable PDFs when your notes are ready."
        />
      </section>

      <Footer />
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative rounded-xl border border-zinc-200 bg-white p-6 text-zinc-900
      shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)]"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-950 text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-6 text-zinc-600">{description}</p>
    </motion.div>
  );
}

export default Home;
