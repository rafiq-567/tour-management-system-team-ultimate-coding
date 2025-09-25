"use client";

import React, { useState } from "react";
import { XCircle, CheckCircle, Loader2 } from "lucide-react";

const RegisterForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: "", text: "", success: false });
  const [loading, setLoading] = useState(false);

  const registerApi = async (payload) => {
    try {
      // Simulated API call
      await new Promise((res) => setTimeout(res, 1500));
      return payload.email !== "test@error.com";
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!username || !email || !password) {
      setModalMessage({
        title: "Validation Error",
        text: "All fields are required.",
        success: false,
      });
      setModalOpen(true);
      setLoading(false);
      return;
    }

    const payload = { username, email, password, role: "user" };
    const result = await registerApi(payload);

    if (!result) {
      setModalMessage({
        title: "Registration Failed",
        text: "Username or email already exists. Please try again.",
        success: false,
      });
    } else {
      setModalMessage({
        title: "Registration Successful",
        text: "Your account has been created. Redirecting to login...",
        success: true,
      });

      // Example redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }

    setModalOpen(true);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  font-sans px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>

      {/* Custom Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm text-center">
            <div className="flex justify-center mb-4">
              {modalMessage.success ? (
                <CheckCircle size={48} className="text-green-500" />
              ) : (
                <XCircle size={48} className="text-red-500" />
              )}
            </div>
            <h4 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              {modalMessage.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{modalMessage.text}</p>
            {!modalMessage.success && (
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
