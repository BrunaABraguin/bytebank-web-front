import mongoose from "mongoose";

type MemoryServer = {
  stop: () => Promise<boolean>;
  getUri: () => string;
};

let isConnected = false;
let mongoServer: MemoryServer | null = null;

const connectToMongoDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    let mongoUri: string;

    if (process.env.NODE_ENV === "development" && !process.env.MONGODB_URI) {
      // Usar MongoDB in-memory apenas se não houver MONGODB_URI configurado
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
        console.log("Using in-memory MongoDB for development");
      } catch {
        console.warn(
          "MongoDB Memory Server not available, falling back to MONGODB_URI"
        );
        if (!process.env.MONGODB_URI) {
          throw new Error(
            "MONGODB_URI is required when MongoDB Memory Server is not available"
          );
        }
        mongoUri = process.env.MONGODB_URI;
      }
    } else {
      if (!process.env.MONGODB_URI) {
        throw new Error(
          "MONGODB_URI is not defined in the environment variables"
        );
      }
      mongoUri = process.env.MONGODB_URI;
      console.log("Using configured MongoDB URI");
    }

    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Função para limpar conexão (útil em testes)
export const disconnectFromMongoDB = async (): Promise<void> => {
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  isConnected = false;
};

export default connectToMongoDB;
