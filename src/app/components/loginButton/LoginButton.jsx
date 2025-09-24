"use client";

import React from 'react';
import { signIn } from "next-auth/react"
import Link from 'next/link';

const LoginButton = () => {
    return (
        <> <span
            className='bg-black text-white px-3 py-2 rounded-xl'
            onClick={() => signIn()}>Sign in</span>
        </>

    );

};

export default LoginButton;
