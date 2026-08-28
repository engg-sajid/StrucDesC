"use client";

import { useState } from "react";
import { loginUser, registerUser } from "@/actions/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (formData: FormData) => {
    setError("");
    const action = isLogin ? loginUser : registerUser;
    const result = await action(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-center text-2xl font-bold text-gray-900">
          {isLogin ? "Sign in to save" : "Create an account"}
        </h2>

        <form action={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            className="block w-full rounded border p-3 text-gray-900 focus:border-slate-800 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="block w-full rounded border p-3 text-gray-900 focus:border-slate-800 focus:outline-none"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded bg-slate-800 p-3 text-white hover:bg-slate-900"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-center text-sm text-slate-600 hover:underline"
        >
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
