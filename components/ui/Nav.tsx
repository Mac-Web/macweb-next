"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function Nav() {
  return (
    <nav className="flex items-center justify-between gap-x-2 border-b border-gray-700 px-30 h-17 z-5 sticky top-0 bg-gray-950 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center gap-x-2 text-white text-lg duration-300 pr-5 py-2 font-bold hover:text-shadow-gray-500 hover:text-shadow-md"
      >
        <Image src="/logo.png" alt="MacWeb Logo" width={35} height={35} /> MacWeb
      </Link>
      <div className="flex items-center gap-x-3">
        <a href="https://mac-web.github.io/macvg/" className="nav-link">
          MacVG
        </a>
        <a href="https://mac-web.github.io/maclearn/" className="nav-link">
          MacLearn
        </a>
        <a href="https://mac-web.github.io/macideas/" className="nav-link">
          MacIdeas
        </a>
        <a href="https://mac-web.github.io/mactools/" className="nav-link">
          MacTools
        </a>
        <a href="https://mac-web.github.io/macblog/" className="nav-link">
          MacBlog
        </a>
        <div className="flex items-center gap-x-3">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 1.1, rotate: 320 }}
            transition={{ duration: 0.7, type: "spring" }}
            title="Toggle light mode"
            className="mx-2.5 cursor-pointer"
            onClick={() => setLightMode(!lightMode)}
          >
            <Image src="/icons/mode.svg" alt="Mode icon" width={25} height={25} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 1.1, rotate: 320 }}
            transition={{ duration: 0.7, type: "spring" }}
            title="Source code"
            className="mx-2.5 cursor-pointer"
            onClick={() => window.open("https://github.com/Mac-Web/mac-web.github.io", "_blank")}
          >
            <Image src="/icons/github.svg" alt="GitHub icon" width={25} height={25} />
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
