export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { Food } from "@/app/lib/foodsModel";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){

    const id = content.params.id;
    console.log(id);

    await connectDB()
    const details=await Restaurant.findOne({_id:id})
    const foodItems=await Food.find({resto_id:id})


    return NextResponse.json({success:true,details,foodItems})

}