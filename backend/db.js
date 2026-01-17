const mongoose = require("mongoose");

// Use `process.env.MONGODB_URI`. Fallback to local MongoDB for development.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/marvelfactory";

// Cache the connection across lambda invocations in serverless environments.
// This avoids creating new connections on every invocation.
let cached = global._mongo;
if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not set. Set process.env.MONGODB_URI and try again.");
    throw new Error("MONGODB_URI not set");
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // Do not call process.exit in serverless environments — surface the error instead.
    throw err;
  }
};

module.exports = connectDB;
