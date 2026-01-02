"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect, useRef, FormEvent } from "react";
import { userSignUp } from "./actions";
import { CredentialsType } from "@/types/User";

function SigninModal({ close }: { close: () => void }) {
  const [credentials, setCredentials] = useState<CredentialsType>({ username: "", display: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
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

  useEffect(() => {
    setError(false);
  }, [signUp]);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const res = await userSignUp(credentials);
    if (res?.error) {
      setError(true);
      setLoading(false);
    } else {
      const signInRes = await signIn("credentials", {
        redirect: false,
        username: credentials.username,
        password: credentials.password,
      });
      if (signInRes?.error) {
        setError(true);
      } else {
        window.location.reload();
      }
    }
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });
    setLoading(false);
    if (res?.error) {
      setError(true);
    } else {
      window.location.reload();
    }
  }

  function handleGoogleSignIn() {
    signIn("google");
    setLoading(true);
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-900/80 flex justify-center items-center z-50 backdrop-blur-sm"
      ref={modalBgRef}
    >
      <form
        onSubmit={(e) => {
          if (signUp) {
            handleSignUp(e);
          } else {
            handleSignIn(e);
          }
        }}
        className="bg-gray-950 rounded flex flex-col gap-y-5 items-center py-8 px-10 w-100"
      >
        <h2 className="text-2xl text-white font-bold">Sign {signUp ? "up for" : "in to"} MacWeb</h2>
        <div className="flex flex-col gap-y-2 w-full">
          {error && (
            <div className="text-red-600 w-full">
              {signUp ? "That username is in use" : "Login failed, check your credentials"}
            </div>
          )}
          <input
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            type="text"
            placeholder="Username"
            className="modal-input"
          />
          {signUp && (
            <input
              value={credentials.display}
              onChange={(e) => setCredentials({ ...credentials, display: e.target.value })}
              type="text"
              placeholder="Display name"
              className="modal-input"
            />
          )}
          <input
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            type="password"
            placeholder="Password"
            className="modal-input"
          />
          <button
            className="bg-blue-600 rounded w-full text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-blue-700 duration-300"
          >
            {loading ? "Loading..." : signUp ? "Sign up" : "Sign in"}
          </button>
          {signUp ? (
            <div className="text-sm text-gray-300 w-full">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => setSignUp(false)}>
                Sign in
              </span>
            </div>
          ) : (
            <div className="text-sm text-gray-300 w-full">
              Don&apos;t have an account yet?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => setSignUp(true)}>
                Sign up
              </span>
            </div>
          )}
        </div>
        <div className="bg-gray-700 w-full h-0.5 relative">
          <span className="absolute left-[50%] -translate-x-[50%] text-gray-100 -translate-y-[50%] px-4 bg-gray-950">or</span>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="bg-gray-900 rounded w-full text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-gray-800 duration-300"
          >
            {loading ? "Loading..." : "Sign in with Google"}
          </button>
          <button
            type="button"
            className="bg-gray-900 rounded w-full text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-gray-800 duration-300"
          >
            Sign in with Facebook
          </button>
          <button
            type="button"
            className="bg-gray-900 rounded w-full text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-gray-800 duration-300"
          >
            Sign in with Apple
          </button>
        </div>
      </form>
    </div>
  );
}

export default SigninModal;
