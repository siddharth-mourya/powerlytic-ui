"use client";

import { useState } from "react";
import { useLoginMutation } from "@/hooks/react-query-hooks/auth/useLoginMutation";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const { mutate, error, isError } = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-md">
            IoT
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            IoT Portal Login
          </h2>
          <p className="text-gray-500 text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">
              <span className="label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-gray-700">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {isError && (
            <div className="text-red-500 text-sm">
              {(error as Error).message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            // disabled={isLoading}
          >
            Login
            {/* {isLoading ? "Logging in..." : "Login"} */}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="link link-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
