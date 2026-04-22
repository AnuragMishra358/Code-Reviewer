import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST() {
  try {
    const options = {
      amount: 100, // ₹1 (in paise)
      currency: "INR",
      receipt: "order_rcptid_1",
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}