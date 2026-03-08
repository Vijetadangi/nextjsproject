import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    foodItemIds: String,
    resto_id: mongoose.Schema.Types.ObjectId,
    deliveryBoy_id: mongoose.Schema.Types.ObjectId,
    status: String,
    amount: String,
});

export const Order =
    mongoose.models.orders || mongoose.model("orders", orderSchema);