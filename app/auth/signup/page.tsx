"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6 border rounded-lg bg-gray-900">

        <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 py-2 rounded"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>
        </p>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Want to go Home?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Home
          </span>
        </p>

      </div>
    </div>
  );
}