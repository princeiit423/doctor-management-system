import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.connection.on('connected', () => console.log("✅ Database connected successfully"));
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Optional: Exit the process if DB connection fails
    }
};

export default connectDB;
