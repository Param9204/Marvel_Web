const Product = require("../models/product");

// Add Product with images
const addProduct = async (req, res) => {
  try {
    const { productName, price, category, marvelCategory, description, status } = req.body;
    if (!productName || !price || !category || !marvelCategory || !description)
      return res.status(400).json({ message: "All fields required" });

    const images = (req.files || []).map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    const product = new Product({
      productName,
      price,
      category,
      marvelCategory,
      description,
      images,
      status: status || "Active",
    });
    await product.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products: products.map((p) => ({
        _id: p._id,
        productName: p.productName,
        price: p.price,
        category: p.category,
        marvelCategory: p.marvelCategory,
        description: p.description,
        features: p.features,
        status: p.status,
        images: p.images.map((img) =>
          `data:${img.contentType};base64,${img.data.toString("base64")}`
        ),
        createdAt: p.createdAt,
        // add any other fields you want here
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product with (optional) new images
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, price, category, marvelCategory, description, status } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Update fields
    product.productName = productName ?? product.productName;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.marvelCategory = marvelCategory ?? product.marvelCategory;
    product.description = description ?? product.description;
    product.status = status ?? product.status;

    // If new images uploaded, replace images
    if (req.files && req.files.length > 0) {
      product.images = req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
    }

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };