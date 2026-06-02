"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import { useRouter } from "next/navigation";

export default function History() {
  const [reviews, setReviews] = useState([]);

  const [page, setPage] = useState(0);

  const router = useRouter();

  const fetchHistory = async (currentPage: number) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `/api/history?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setReviews(data.reviews);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch history");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetchHistory(page);
  }, [page]);

  return (
    <div className="p-6 space-y-6">

      {/* Title */}
      <h1 className="text-3xl font-bold text-white">
        Review History
      </h1>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r: any, i) => (
            <ReviewCard key={i} review={r} />
          ))
        ) : (
          <p className="text-gray-400">
            No reviews found.
          </p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-4">

        {/* Previous */}
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Number */}
        <p className="text-white font-medium">
          Page {page + 1}
        </p>

        {/* Next */}
        <button
          disabled={reviews.length < 5}
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
}