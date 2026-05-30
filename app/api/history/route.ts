import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import { getUserFromRequest } from "@/middleware/authMiddleware";

export async function GET(req: Request) {
  try {
    await connectDB();

    const userData = getUserFromRequest(req as any);

    if (!userData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 0;
    const limit = Number(searchParams.get("limit")) || 5;

    const reviews = await Review.find({ userId: userData.userId })
      .sort({ createdAt: -1 })
      .select("code feedback language createdAt")
      .skip(page * limit)
      .limit(limit);

    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 },
    );
  }
}
