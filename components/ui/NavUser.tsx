"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { MdDarkMode, MdLogout, MdLightMode } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

function NavUser({ user }: { user: Session["user"] }) {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickHandler = (e: Event) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="rounded-full cursor-pointer"
        title={user?.email ? user.email : ""}
        onClick={() => setMenuOpen(true)}
      >
        {user?.image ? (
          <Image src={user.image} alt="Avatar" width={35} height={35} className="rounded-full" />
        ) : (
          <FaUser color="white" size={25} />
        )}
      </motion.div>
      {menuOpen && (
        <div className="absolute right-0 top-[120%] flex flex-col rounded-lg p-2 bg-gray-100 dark:bg-gray-900 w-35" ref={menuRef}>
          <div className="menu-option group font-bold hover:bg-gray-100!  dark:hover:bg-gray-900! cursor-default!">
            {user?.name}
          </div>
          <Link href="/profile" className="menu-option group" onClick={() => setMenuOpen(false)}>
            <FaUser size={20} className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" />
            Profile
          </Link>
          <div className="menu-option group" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? (
              <MdLightMode size={20} className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" />
            ) : (
              <MdDarkMode size={20} className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" />
            )}
            Theme
          </div>
          <div className="menu-option group" onClick={() => signOut()}>
            <MdLogout className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" size={20} />
            Log out
          </div>
        </div>
      )}
    </div>
  );
}

export default NavUser;
