const mongoose = require('mongoose');
require('dotenv').config();

const { username, password } = process.env;
const connectionStr = `mongodb+srv://${username}:${password}@cluster0.bqag9b5.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`;

console.log("Attempting to connect to MongoDB...");
console.log("Connection string (masked):", connectionStr.replace(password, "****"));

mongoose.connect(connectionStr)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:");
    console.error(err);
    process.exit(1);
  });
