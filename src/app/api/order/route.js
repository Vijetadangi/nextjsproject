export const dynamic = "force-dynamic";
import { connectDB } from "@/app/lib/db";
import { Order } from "@/app/lib/ordersMode";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request) {
    const payload = await request.json();
    await connectDB();
    let success = false;
    const orderObj = new Order(payload);
    const result = await orderObj.save();
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id');
    let success = false
    await connectDB()
    let result = await Order.find({ user_id: userId });
    if (result) {
        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {};
                restoInfo.data = await Restaurant.findOne({ _id: item.resto_id })
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return restoInfo;
            })
        )
        result = restoData;
        success = true
    }

    return NextResponse.json({ result,success })

}