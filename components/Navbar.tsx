"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 border-b">
      <h1 className="font-bold">Code Reviewer</h1>

      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/history">History</Link>
      </div>
    </div>
  );
}