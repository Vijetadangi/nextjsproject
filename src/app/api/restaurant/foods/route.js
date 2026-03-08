export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { Food } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success=false;
    await connectDB();
    const food = new Food(payload);
    const result = await food.save();
    if(result){
        success=true
    }
    return NextResponse.json({ result, success })
}