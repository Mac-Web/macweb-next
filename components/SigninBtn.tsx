"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import SigninModal from "./SigninModal";

function SigninBtnContent() {
  const [signinModalOpen, setSigninModalOpen] = useState<boolean>(false);
  const [redirectURL, setRedirectURL] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (redirect) {
      setSigninModalOpen(true);
      setRedirectURL(redirect);
    }
  }, [redirect]);

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
      <AnimatePresence>
        {signinModalOpen && <SigninModal close={() => setSigninModalOpen(false)} redirect={redirectURL} />}
      </AnimatePresence>
    </>
  );
}

function SigninBtn() {
  return (
    <Suspense>
      <SigninBtnContent />
    </Suspense>
  );
}

export default SigninBtn;
