"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserType } from "@/types/User";
import { updateDisplayName } from "@/app/profile/actions";

type DisplayModalTypes = {
  existingUser: UserType;
  close: () => void;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
};

function DisplayModal({ existingUser, close, setDisplay }: DisplayModalTypes) {
  const [text, setText] = useState<string>(existingUser.display || "");
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
    await updateDisplayName(existingUser._id, text);
    setDisplay(text);
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
        className="bg-gray-100 dark:bg-gray-950 rounded flex flex-col gap-y-10 items-center py-8 px-10 w-100 relative"
      >
        <h2 className="text-2xl font-bold text-black dark:text-white text-center">Edit Display Name</h2>
        <input
          type="text"
          className="modal-input"
          placeholder="Display name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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

export default DisplayModal;
