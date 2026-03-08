export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersMode";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await connectDB();
    const user= new deliveryPartnersSchema(payload);
    const result = await user.save()
    if(result){
        success=true
    }

    
    return NextResponse.json({result,success})

}