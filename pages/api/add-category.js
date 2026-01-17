const connectDB = require("../../backend/db");
const Category = require("../../backend/models/category");

connectDB();

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { name } = req.body || {};
      if (!name) return res.status(400).json({ error: "Name is required" });
      const existing = await Category.findOne({ name: name.trim() });
      if (existing) return res.status(409).json({ error: "Category exists" });
      const cat = await Category.create({ name: name.trim() });
      return res.status(201).json({ success: true, category: cat });
    }

    if (req.method === "GET") {
      const categories = await Category.find().sort({ createdAt: -1 });
      return res.status(200).json(categories);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("❌ Category API error:", err);
    return res.status(500).json({ success: false, error: "Failed to handle category." });
  }
};
