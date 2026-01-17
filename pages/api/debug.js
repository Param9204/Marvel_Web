const connectDB = require("../../backend/db");
const Category = require("../../backend/models/category");

/**
 * Diagnostic endpoint - shows MongoDB connection status and category count
 * GET /api/debug returns connection info
 */
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    // Get category count
    const categoryCount = await Category.countDocuments();
    const categories = await Category.find().limit(5);

    // Get MongoDB URI (masked for security)
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/marvelfactory";
    const maskedUri = mongoUri.replace(/:[^@]*@/, ":****@");

    return res.status(200).json({
      success: true,
      message: "✅ MongoDB Connected",
      data: {
        mongoUri: maskedUri,
        databaseName: mongoUri.split("/").pop()?.split("?")[0] || "unknown",
        categoryCount,
        sampleCategories: categories,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("❌ Debug error:", err);
    return res.status(500).json({
      success: false,
      message: "❌ MongoDB Connection Failed",
      error: err.message,
      mongoUri: process.env.MONGODB_URI ? "SET" : "NOT SET",
    });
  }
};
