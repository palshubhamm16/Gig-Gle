import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const uri = process.env.MONGO_URI as string; // Get MongoDB URI from .env

if (!uri) {
  throw new Error("MongoDB connection string (MONGO_URI) is missing in .env file");
}

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    return client.db(); // Return database instance
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
