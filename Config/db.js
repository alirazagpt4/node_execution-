import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionDb = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database connected successfully");
        
    } catch (err) {
        console.log("Database connection failed:", err);
    }
};

export default connectionDb;