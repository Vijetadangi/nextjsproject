import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    city: String,
    address: String,
});

export const DeliveryPartner =
    mongoose.models.deliverypartners ||
    mongoose.model("deliverypartners", deliveryPartnerSchema);