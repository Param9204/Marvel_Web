const connectDB = require("../../backend/db");
const Product = require("../../backend/models/product");

connectDB();

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

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
      // Handle single product fetch by id
      const { id } = req.query;
      if (id) {
        const product = await Product.findById(id).populate("category");
        if (!product) {
          return res.status(404).json({ success: false, error: "Product not found" });
        }
        return res.status(200).json({ success: true, product });
      }

      // Get all products
      const products = await Product.find().sort({ createdAt: -1 }).limit(200).populate("category");
      console.log(`✅ Found ${products.length} products`);
      return res.status(200).json({ success: true, data: products, products });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("❌ Product API error:", err);
    return res.status(500).json({ success: false, error: "Failed to handle product." });
  }
};
