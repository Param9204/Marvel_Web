const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

// Prevent model overwrite error in Next.js hot reload
module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);