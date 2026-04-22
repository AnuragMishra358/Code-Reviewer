"use client";

import ReactMarkdown from "react-markdown";

export default function ReviewOutput({ review }: any) {
  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white">
      <ReactMarkdown>{review}</ReactMarkdown>
    </div>
  );
}