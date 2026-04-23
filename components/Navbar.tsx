"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router=useRouter();
  return (
    <div className="flex justify-between p-4 border-b">
      <h1 className="font-bold">Code Reviewer</h1>

      <div className="space-x-4">
        <button onClick={()=>{
          localStorage.removeItem("token");
          router.push("/auth/login");
        }}>Logout</button>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/history">History</Link>
      </div>
    </div>
  );
}