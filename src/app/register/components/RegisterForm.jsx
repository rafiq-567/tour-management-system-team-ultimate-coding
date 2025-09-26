"use client";

import React, { useState } from "react";
import { XCircle, CheckCircle, Loader2 } from "lucide-react";
import registerApi from "../actions/auth/registerApi";
import Swal from "sweetalert2";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    const form = e.target;
    const name = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();


    const payload = { name, email, password, role: "user" };
    const result = await registerApi(payload);
    if (result) {
      form.reset();
      router.push("/login");
      setSpinner(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration has been successfully",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      setSpinner(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This email already exist",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  font-sans px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl  w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Create an Account
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              User Name
            </label>
            <input
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
              type="text"
              name="username"
              placeholder="Enter unique username"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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

          <button className="btn btn-neutral w-full rounded-xl" >
          {
            spinner ? <LoadingSpinner />: ""
          }
          Register</button>

        </form>
      </div>


    </div>
  );
};

export default RegisterForm;
