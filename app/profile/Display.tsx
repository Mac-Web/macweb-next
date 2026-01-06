"use client";

import { UserType } from "@/types/User";
import { FaEdit } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import DisplayModal from "@/components/DisplayModal";

type DisplayProps = {
  existingUser: UserType;
  viewer?: boolean;
};

function Display({ existingUser, viewer }: DisplayProps) {
  const [displayModalOpen, setDisplayModalOpen] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>(existingUser.display!);

  return (
    <>
      <h2 className="text-black dark:text-white text-2xl font-bold flex gap-x-5 items-center">
        {display}
        {!viewer && (
          <FaEdit size={20} className="cursor-pointer" title="Edit display name" onClick={() => setDisplayModalOpen(true)} />
        )}
      </h2>
      <AnimatePresence>
        {displayModalOpen && (
          <DisplayModal existingUser={existingUser} close={() => setDisplayModalOpen(false)} setDisplay={setDisplay} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Display;
