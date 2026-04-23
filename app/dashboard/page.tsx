"use client";

import { useEffect, useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import ReviewOutput from "@/components/ReviewOutput";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("free");
  const [remaining, setRemaining] = useState(5);
  

  const router = useRouter();

  useEffect(() => {
     const token = localStorage.getItem("token");
    if (!token ) {
      router.push("/auth/login");
    }
  }, []);

  const handleUpgrade = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("data => ", data);

    if (!res.ok || !data.order) {
      alert("Order creation failed");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "Code Reviewer SaaS",
      description: "Upgrade to Pro",
      order_id: data.order.id,

      handler: async function (response: any) {
        await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...response,
          }),
        });

        alert("🎉 Upgraded to Pro!");
        location.reload();
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleReview = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);

    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        code,
        language: "javascript",
      }),
    });

    const data = await res.json();

    // console.log("data=> ",data);
    setReview(data.feedback);
    setRemaining(data.remaining);
    setPlan(data.plan);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
        <div>
          <p className="text-sm text-gray-400">Plan</p>
          <p className="font-bold capitalize">{plan}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Remaining</p>
          <p className="font-bold">{remaining}</p>
        </div>

        {plan === "free" && (
          <button
            onClick={handleUpgrade}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Upgrade 🚀
          </button>
        )}
      </div>

      <CodeEditor code={code} setCode={setCode} />

      <button
        onClick={handleReview}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Reviewing..." : "Review Code"}
      </button>

      {review && <ReviewOutput review={review} />}
    </div>
  );
}
