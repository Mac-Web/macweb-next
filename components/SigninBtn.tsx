"use client";

import { useState, useEffect } from "react";
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
        className="bg-blue-600 rounded-lg text-white text-lg font-bold py-2 px-5 cursor-pointer hover:bg-blue-700 duration-300"
        onClick={() => setSigninModalOpen(true)}
      >
        Sign in
      </button>
      {signinModalOpen && <SigninModal close={() => setSigninModalOpen(false)} />}
    </>
  );
}

export default SigninBtn;
