import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let isConnected = false;

const connectToMongoDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }
  try {
    let mongoUri: string;

    if (process.env.NODE_ENV === "development") {
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      isConnected = true;
      console.log("Using in-memory MongoDB instance");
    } else {
      if (!process.env.MONGODB_URI) {
        throw new Error(
          "MONGODB_URI is not defined in the environment variables"
        );
      }
      isConnected = true;
      mongoUri = process.env.MONGODB_URI;
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;
