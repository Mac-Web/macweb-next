"use client";
import { signIn } from "next-auth/react";

function SigninModal() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900/50 flex justify-center items-center z-10 backdrop-blur-sm">
      <form className="bg-gray-950 rounded-lg flex flex-col gap-y-5 items-center py-5 px-10 w-100">
        <h2 className="text-2xl text-white font-bold">Sign in to MacWeb</h2>
        <input type="text" placeholder="Username" className="modal-input" />
        <input type="text" placeholder="Password" className="modal-input" />
        <button
          onClick={() => signIn("google")}
          type="button"
          className="bg-blue-600 rounded-lg w-full text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-blue-700 duration-300"
        >
          Sign in with Google
        </button>
        <button
          className="bg-blue-600 rounded-lg w-full text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-blue-700 duration-300"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default SigninModal;
