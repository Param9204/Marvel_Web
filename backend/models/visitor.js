const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    country: { type: String, default: "Unknown" },
    city: { type: String, default: "Unknown" },
    flag: { type: String, default: "🌍" },
    deviceType: { type: String, enum: ["Desktop", "Mobile", "Tablet"], default: "Desktop" },
    browser: { type: String, default: "Unknown" },
    page: { type: String, default: "/" },
    userAgent: { type: String, default: null },
    timestamp: { type: Date, default: Date.now, index: true },
    sessionId: { type: String, index: true },
  },
  { timestamps: true }
);

// Index for efficient queries
visitorSchema.index({ country: 1, timestamp: -1 });
visitorSchema.index({ timestamp: -1 });
visitorSchema.index({ deviceType: 1 });

module.exports = mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);
