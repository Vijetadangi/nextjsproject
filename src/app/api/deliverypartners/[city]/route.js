export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { DeliveryPartner } from "@/app/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request,content){
    let city= content.params.city
    let success=false;
    await connectDB();
    let filter ={city:{$regex:new RegExp(city,'i')}}
    const result = await DeliveryPartner.find(filter)
   return NextResponse.json({result})
}