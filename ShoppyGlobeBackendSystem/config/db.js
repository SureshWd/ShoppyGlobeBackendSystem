const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

const connectDB = async () => {
    try {
        await mongoose.connect(URI); 
        console.log("MongoDB Connected at:", URI);
    } catch (error) {
        console.error("Mongoose connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
