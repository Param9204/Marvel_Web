const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    marvelCategory: { type: String, required: true, index: true },
    description: { type: String, required: true },
    images: [imageSchema],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      index: true,
    },
  },
  { timestamps: true }
);

// Optimize queries by using select: false for large image field
productSchema.pre('find', function() {
  if (!this.getOptions().includeImages) {
    this.select('-images');
  }
});

productSchema.pre('findOne', function() {
  if (!this.getOptions().includeImages) {
    this.select('-images');
  }
});

// Prevent model overwrite error in Next.js hot reload
module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);