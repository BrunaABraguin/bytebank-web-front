import mongoose from "mongoose";

const connectToMongoDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;
