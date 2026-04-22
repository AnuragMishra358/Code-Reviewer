import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export const getUserFromRequest = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  return decoded;
};