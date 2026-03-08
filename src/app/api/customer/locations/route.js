export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import { connectDB } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const data = await Restaurant.find().select("city -_id");

    const cities = [...new Set(
      data.map(item =>
        item.city.charAt(0).toUpperCase() + item.city.slice(1)
      )
    )];

    return NextResponse.json({ success: true, result: cities });

  } catch (e) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}
