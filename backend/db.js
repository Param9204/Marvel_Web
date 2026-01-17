const mongoose = require("mongoose");

// Prefer `process.env.MONGODB_URI`. Fallback to MongoDB Atlas connection string.
// NOTE: It's strongly recommended to set a MONGODB_URI in your environment
// instead of committing credentials into source control.
const MONGODB_URI =
  process.env.MONGODB_URI ||
  // Provided Atlas URI with password URL-encoded ("@" => "%40").
  "mongodb+srv://paramthumar2708_db_user:123456%40123@cluster0.xcs9f1z.mongodb.net/marvelfactory?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
