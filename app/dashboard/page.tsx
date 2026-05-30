"use client";

import { useEffect, useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import ReviewOutput from "@/components/ReviewOutput";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ language state
  const [language, setLanguage] = useState("javascript");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  const handleReview = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setReview(data.feedback);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white">AI Code Reviewer</h1>

      {/* Language Selector */}
      <div className="flex justify-between">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Select Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
        </div>

        {/* Review Button */}
        <button
          onClick={handleReview}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Reviewing..." : "Review Code"}
        </button>
      </div>

      {/* Editor */}
      <CodeEditor code={code} setCode={setCode} />

      {/* Output */}
      {review && <ReviewOutput review={review} />}
    </div>
  );
}
