export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { DeliveryPartner } from "@/app/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    await connectDB();

    // 1️⃣ Find delivery partner by email
    const user = await DeliveryPartner.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Compare password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // 3️⃣ Remove password before response
    const userData = user.toObject();
    delete userData.password;

    return NextResponse.json({ success: true, result: userData });

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
