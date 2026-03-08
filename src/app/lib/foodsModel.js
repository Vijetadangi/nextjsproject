import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    img_path: String,
    description: String,
    resto_id: mongoose.Schema.Types.ObjectId
});

export const Food = mongoose.models.foods || mongoose.model("foods", foodSchema);