export const dynamic = "force-dynamic";
import { connectionStr } from "@/app/lib/db";
import { User } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    await mongoose.connect(connectionStr);

    const user = await User.findOne({ email, password });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      result: JSON.parse(JSON.stringify(user)),
    });

  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
