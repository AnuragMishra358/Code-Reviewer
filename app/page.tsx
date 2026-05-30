"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/dashboard");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6">

      {/* Navbar */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold select-none">CodeReviewer</h1>
        <div className="space-x-4">
          <button onClick={() => router.push("/auth/login")}>Login</button>
          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-blue-500 px-4 py-1 rounded"
          >
            Signup
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20">
        <h1 className="text-5xl font-bold mb-4">
          Review Your Code with AI 
        </h1>
        <p className="text-gray-400 max-w-xl mb-6">
          Detect bugs, improve performance, and write better code instantly using AI-powered analysis.
        </p>

        <button
          onClick={() => router.push("/auth/signup")}
          className="bg-blue-500 px-6 py-3 rounded-lg text-lg hover:scale-105 transition"
        >
          Get Started
        </button>
      </div>

      {/* Features */}
      <div className="mt-24 grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-gray-900">
          <h2 className="font-bold text-lg">⚡ Instant Review</h2>
          <p className="text-gray-400 mt-2">
            Get feedback on your code in seconds.
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-gray-900">
          <h2 className="font-bold text-lg">🧠 AI Powered</h2>
          <p className="text-gray-400 mt-2">
            Uses Gemini AI for smart analysis.
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-gray-900">
          <h2 className="font-bold text-lg">📜 History</h2>
          <p className="text-gray-400 mt-2">
            Save and revisit past reviews anytime.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center text-gray-500 pb-6">
        © 2026 CodeReviewer. Built by Anurag 
      </div>

    </div>
  );
}