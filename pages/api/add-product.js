const connectDB = require("../../backend/db");
const Product = require("../../backend/models/product");

connectDB();

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const {
        productName,
        price,
        category,
        marvelCategory,
        description,
        images,
        status,
      } = req.body || {};

      if (!productName || price == null || !category || !marvelCategory || !description) {
        return res.status(400).json({ error: "Missing required product fields" });
      }

      const prod = await Product.create({
        productName: productName.trim(),
        price: Number(price),
        category,
        marvelCategory: marvelCategory.trim(),
        description: description.trim(),
        images: images || [],
        status: status || undefined,
      });

      return res.status(201).json({ success: true, product: prod });
    }

    if (req.method === "GET") {
      const products = await Product.find().sort({ createdAt: -1 }).limit(200).populate("category");
      return res.status(200).json(products);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("❌ Product API error:", err);
    return res.status(500).json({ success: false, error: "Failed to handle product." });
  }
};
