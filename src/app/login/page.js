import Image from 'next/image';
import React from 'react';
import LoginForm from './compnents/LoginForm';

const login = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src="/login.png"
          width={400}
          height={233}
          className="max-w-sm rounded-lg w-[300px] lg:w-[400px]"
          alt="login Image"
        />
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
    );
};

export default login;