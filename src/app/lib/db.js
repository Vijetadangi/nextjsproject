const { username, password } = process.env;

export const connectionStr = username && password 
  ? `mongodb+srv://${username}:${password}@cluster0.bqag9b5.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`
  : null;

import mongoose from "mongoose";

export async function connectDB() {
    if (!connectionStr) {
        console.log("No connection string found, skipping DB connection (likely build time)");
        return;
    }
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(connectionStr);
}