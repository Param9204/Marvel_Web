const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    marvelCategory: { type: String, required: true },
    description: { type: String, required: true },
    images: [imageSchema],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);