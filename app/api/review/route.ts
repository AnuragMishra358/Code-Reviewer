import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromRequest } from "@/middleware/authMiddleware";
import { reviewCode } from "@/lib/gemini";
import Review from "@/models/Review";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 🔐 Get user from token
    const userData = getUserFromRequest(req as any);

    if (!userData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userData.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { code, language } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // 🤖 Call Gemini
    const feedback = await reviewCode(code, language);

    // 💾 Save review in DB
    await Review.create({
      userId: user._id,
      code,
      language,
      feedback,
    });

    return NextResponse.json({
      feedback,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
