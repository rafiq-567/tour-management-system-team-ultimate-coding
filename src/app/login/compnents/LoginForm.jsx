"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import SocialLogin from "./SocialLogin";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/register/components/LoadingSpinner";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      setSpinner(false);
      router.push("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1200,
        width: 100, // smaller width
        padding: "1rem",
        iconColor: "#2563EB", // nice blue color
        background: "#f9f9f9",
        color: "#111827", // dark text
        timerProgressBar: true,
      });
    } else {
      setSpinner(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email or password is incorrect!",
        width: 260, // smaller width
        padding: "1rem",
        iconColor: "#DC2626", // red color
        background: "#f9f9f9",
        color: "#111827",
        showConfirmButton: true,
        confirmButtonText: "Try Again",
        confirmButtonColor: "#2563EB", // blue button
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl  w-full max-w-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Login an account
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            type="email"
            name="email"
            placeholder="Enter unique email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md transition-colors duration-200 flex items-center justify-center cursor-pointer"
        >
          {spinner ? <LoadingSpinner /> : ""}
          login
        </button>
      </form>
      <p className="mt-4 text-center">or</p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default LoginForm;
