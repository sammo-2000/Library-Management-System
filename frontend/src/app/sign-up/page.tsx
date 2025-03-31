"use client";

import { setToken } from "@/functions/auth/setToken";
import { SIGN_API } from "@/lib/apiEndPoint";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${SIGN_API}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          username: form.username,
          first_name: form.first_name,
          last_name: form.last_name,
          user_role: "paidMember",
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok)
        return setError(`${data.errors[0].path} - ${data.errors[0].message}`);

      await setToken(data.token); // Save token in cookies

      setSuccess("Sign-in successful! Redirecting...");
      router.push("/"); // Redirect to a protected page
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Sign Up
        </h1>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-4 text-sm text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              required
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              required
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
