import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Errow while connecting to MONGODB : " + error.message);
    }
};

export default connectToDb;