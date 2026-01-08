"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { updateProfilePicture } from "@/app/profile/actions";
import { UserType } from "@/types/User";

type ProfileModalProps = {
  existingUser: UserType;
  close: () => void;
  icons: string[];
  setSelectedIcon: React.Dispatch<React.SetStateAction<number>>;
};

function ProfileModal({ existingUser, close, icons, setSelectedIcon }: ProfileModalProps) {
  const [selected, setSelected] = useState<number>(existingUser.picture || 0);
  const modalBgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (modalBgRef.current === e.target) {
        close();
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  });

  async function handleSave() {
    await updateProfilePicture(existingUser._id, selected);
    setSelectedIcon(selected);
    close();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen bg-gray-300/80 dark:bg-gray-900/80 flex justify-center items-center z-50 backdrop-blur-sm"
      ref={modalBgRef}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-gray-100 dark:bg-gray-950 rounded flex flex-col gap-y-5 items-center pt-3 p-10 w-[90vw] sm:w-[80vw] md:w-100 relative max-h-[95vh] overflow-auto"
      >
        <h2 className="text-2xl font-bold text-black dark:text-white text-center">Edit Profile Picture</h2>
        <div className="flex flex-wrap justify-between gap-3 w-full">
          {icons.map((icon: string, i: number) => {
            const name = icon[0].toUpperCase() + icon.slice(1);
            return (
              <Image
                key={i}
                src={`/icons/${icon}.svg`}
                alt={name}
                title={name}
                width={80}
                height={80}
                className={`cursor-pointer invert dark:invert-0 rounded-full border-4 border-gray-400 dark:border-gray-700 duration-300 ${
                  selected === i ? "border-blue-600!" : ""
                }`}
                onClick={() => setSelected(i)}
              />
            );
          })}
        </div>
        <button
          className="bg-blue-600 rounded w-fit px-5 text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-blue-700 duration-300"
          onClick={handleSave}
        >
          Save
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ProfileModal;
