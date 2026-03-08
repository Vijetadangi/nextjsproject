export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { User } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await connectDB();
    const result = await User.findOne({ email: payload.email, password: payload.password });
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })
}