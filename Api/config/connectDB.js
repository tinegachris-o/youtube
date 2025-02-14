import mongoose from "mongoose";
import dotenv from "dotenv";
import "colors";

dotenv.config({ path: "/home/tinega/Documents/VidX/Api/.env" });

const connectDB = async () => {
  try {
    let db = "mongodb://localhost:27017/Youtube";
let dbs = process.env.MONGO_URL;
    const conn = await mongoose.connect(dbs);
    console.log('mongodb connected sucessfully'.cyan.bold)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
