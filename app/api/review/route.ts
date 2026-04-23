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

    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    const todayReviewsCount = await Review.countDocuments({
      userId: user._id,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    const dailyLimit = user.plan === "pro" ? 50 : 5;

    if (todayReviewsCount >= dailyLimit) {
      console.log("daily limit reached");
      return NextResponse.json(
        { error: `Daily limit reached (${dailyLimit} reviews/day)` },
        { status: 403 },
      );
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

    // 📈 Increase usage
    user.reviewsUsed += 1;
    await user.save();

    return NextResponse.json({
      feedback,
      remaining : dailyLimit - todayReviewsCount - 1,
      plan:user.plan
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
