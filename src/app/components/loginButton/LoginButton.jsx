"use client";
import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <>

   
      <p
        className="bg-black text-white px-3 py-2 rounded-xl ml-2"
        onClick={() => signIn()}
      >
        SignIin
      </p>
    </>
  );
};

export default LoginButton;
