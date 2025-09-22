"use client";
import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <>
      <button
        className="bg-black text-white px-3 py-2 rounded-xl"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
};

export default LoginButton;
