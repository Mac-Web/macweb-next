"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SigninModal from "./SigninModal";

function SigninBtn() {
  const [signinModalOpen, setSigninModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (signinModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [signinModalOpen]);

  return (
    <>
      <button
        className="bg-blue-600 rounded text-white text-lg font-bold py-1.5 px-4 cursor-pointer hover:bg-blue-700 duration-300"
        onClick={() => setSigninModalOpen(true)}
      >
        Sign in
      </button>
      <AnimatePresence>{signinModalOpen && <SigninModal close={() => setSigninModalOpen(false)} />}</AnimatePresence>
    </>
  );
}

export default SigninBtn;
