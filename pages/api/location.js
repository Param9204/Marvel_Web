const connectDB = require("../../backend/db");
const Location = require("../../backend/models/location");

connectDB();

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { lat, lng, country, city, flag, timestamp } = req.body || {};
      const loc = await Location.create({ lat, lng, country, city, flag, timestamp });
      return res.status(201).json({ success: true, location: loc });
    }

    if (req.method === "GET") {
      const locations = await Location.find().sort({ timestamp: -1 }).limit(100);
      return res.status(200).json(locations);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("❌ Location API error:", err);
    return res.status(500).json({ success: false, error: "Failed to handle location." });
  }
};
