"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import { useRouter } from "next/navigation";

export default function History() {
  const [reviews, setReviews] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
    }
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setReviews(data.reviews);
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">History</h1>

      {reviews.map((r: any, i) => (
        <ReviewCard key={i} review={r} />
      ))}
    </div>
  );
}
