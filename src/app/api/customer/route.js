export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams;

    let filter = {};

    if (params.get("location")) {
      filter.city = { $regex: params.get("location"), $options: "i" };
    }

    if (params.get("restaurant")) {
      filter.name = { $regex: params.get("restaurant"), $options: "i" };
    }

    await mongoose.connect(connectionStr);

    const result = await Restaurant.find(filter);

    return NextResponse.json({ success: true, result });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
