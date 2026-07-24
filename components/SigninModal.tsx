"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const oAuthProviders = ["google", "discord", "facebook", "github"];

type SigninModalProps = {
  close: () => void;
  redirect?: string | null;
};

interface CredentialsType {
  email: string;
  name: string;
  password: string;
}

function SigninModal({ close, redirect }: SigninModalProps) {
  const [credentials, setCredentials] = useState<CredentialsType>({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState<string | boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [signUp, setSignUp] = useState<boolean>(false);
  const modalBgRef = useRef<HTMLDivElement | null>(null);
  const root = process.env.NEXT_PUBLIC_ROOT_DOMAIN as string;

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
    setError(null);
  }, [signUp]);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await authClient["signUp"].email(
      { ...credentials },
      {
        onSuccess: () => {
          if (redirect) {
            window.open(`http://${redirect}.${root}`, "_self");
          } else {
            window.location.reload();
          }
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await authClient.signIn.email(
      { ...credentials },
      {
        onSuccess: () => {
          if (redirect) {
            window.open(`http://${redirect}.${root}`, "_self");
          } else {
            window.location.reload();
          }
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  }

  async function handleOAuthSignin(provider: string) {
    setLoading(provider);
    const targetRedirect = redirect
      ? `http://${redirect}.${root}`
      : `http://${root}/profile`;
    await authClient.signIn.social({
      provider,
      callbackURL: targetRedirect,
      errorCallbackURL: targetRedirect,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen bg-gray-300/80 dark:bg-gray-900/80 flex justify-center items-center z-50 backdrop-blur-sm"
      ref={modalBgRef}
    >
      <motion.form
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onSubmit={(e) => {
          if (signUp) {
            handleSignUp(e);
          } else {
            handleSignIn(e);
          }
        }}
        className="bg-gray-100 dark:bg-gray-950 rounded flex flex-col gap-y-2 items-center pt-3 py-8 px-10 w-[90vw] sm:w-[80vw] md:w-100 relative max-h-[95vh] overflow-auto"
      >
        <Image
          src="/logo.png"
          alt="MacWeb Logo"
          width={45}
          height={45}
          className=" -top-10"
        />
        <div className="w-full flex flex-col items-center gap-y-5">
          <h2 className="text-2xl text-black dark:text-white font-bold">
            Sign {signUp ? "up for" : "in to"} MacWeb
          </h2>
          <div className="flex flex-col gap-y-2 w-full">
            {error && <div className="text-red-600 w-full">{error}</div>}
            <input
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              type="text"
              placeholder="Email"
              className="modal-input"
            />
            {signUp && (
              <input
                value={credentials.name}
                onChange={(e) =>
                  setCredentials({ ...credentials, name: e.target.value })
                }
                type="text"
                placeholder="Display name"
                className="modal-input"
              />
            )}
            <input
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="modal-input"
            />
            <button
              className="bg-blue-600 rounded w-full text-white text-lg cursor-pointer py-2 font-bold
         hover:bg-blue-700 duration-300"
            >
              {loading === true ? "Loading..." : signUp ? "Sign up" : "Sign in"}
            </button>
            {signUp ? (
              <div className="text-sm text-gray-800 dark:text-gray-300 w-full">
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setSignUp(false)}
                >
                  Sign in
                </span>
              </div>
            ) : (
              <div className="text-sm text-gray-800 dark:text-gray-300 w-full">
                Don&apos;t have an account yet?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setSignUp(true)}
                >
                  Sign up
                </span>
              </div>
            )}
          </div>
          <div className="bg-gray-400 dark:bg-gray-700 w-full h-0.5 relative">
            <span className="absolute left-[50%] -translate-x-[50%] text-gray-800 dark:text-gray-100 -translate-y-[50%] px-4 bg-gray-100 dark:bg-gray-950">
              or
            </span>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            {oAuthProviders.map((provider: string, i: number) => {
              const capitalized = provider[0].toUpperCase() + provider.slice(1);
              return (
                <button
                  key={i}
                  onClick={() => handleOAuthSignin(provider)}
                  type="button"
                  className="oauth-btn"
                >
                  <Image
                    src={`/oauth/${provider}.png`}
                    alt={`${capitalized} Logo`}
                    title={`${capitalized} Logo`}
                    width={25}
                    height={25}
                    className={`${provider === "github" ? "invert" : ""} dark:invert-0`}
                  />
                  {loading === provider
                    ? "Loading..."
                    : "Sign in with " + capitalized}
                </button>
              );
            })}
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default SigninModal;
