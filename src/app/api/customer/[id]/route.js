export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){

    const id = content.params.id;
    console.log(id);

    await connectDB()
    const details=await restaurantSchema.findOne({_id:id})
    const foodItems=await foodSchema.find({resto_id:id})


    return NextResponse.json({success:true,details,foodItems})

}