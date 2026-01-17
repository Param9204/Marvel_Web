require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const EMAIL_USER = process.env.EMAIL_USER || "paramthumar2004@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "xplu gftm aijd gypf";
const PORT = process.env.PORT || 4000;

const connectDB = require("./db");
const Location = require("./models/location");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

connectDB();

const app = express();
app.use(express.json());

// CORS configuration - allow all origins in development, restrict in production
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:4000",
      "http://127.0.0.1:4000",
      FRONTEND_URL,
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV === "production") {
      callback(new Error("Not allowed by CORS"));
    } else {
      // Allow all in development
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send(
    `<h2>Marvel Factory Contact API</h2>
    <p>Status: <span style="color:green;font-weight:bold;">Running</span></p>
    <p>POST to <code>/api/contact</code> with your contact form data.</p>
    <p>POST to <code>/api/location</code> to store visitor location.</p>
    <p>GET <code>/api/location</code> to view recent visitor locations.</p>
    `
  );
});

// ----- Contact Form Email Route -----
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, inquiryType, department, message } =
    req.body;

  const htmlBody = `
    <div style="font-family:sans-serif;">
      <h2 style="color:#D7263D;">New Contact Form Submission 📨</h2>
      <table style="border-collapse:collapse;">
        <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone || "-"}</td></tr>
        <tr><td><strong>Company:</strong></td><td>${company || "-"}</td></tr>
        <tr><td><strong>Inquiry Type:</strong></td><td>${inquiryType}</td></tr>
        <tr><td><strong>Department:</strong></td><td>${
          department || "-"
        }</td></tr>
      </table>
      <div style="margin-top:1em;">
        <strong>Message:</strong>
        <p style="background:#f7f7f9;padding:1em;border-radius:5px;">${message}</p>
      </div>
      <hr />
      <p style="font-size:0.9em;color:#888;">Marvel Factory Contact API | ${new Date().toLocaleString()}</p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Marvel Factory" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: "New Contact Form Submission - Marvel Factory",
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully.");
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
});

// ----- Visitor Location Storage -----
app.post("/api/location", async (req, res) => {
  try {
    const { lat, lng, country, city, flag, timestamp } = req.body;
    const loc = await Location.create({
      lat,
      lng,
      country,
      city,
      flag,
      timestamp,
    });
    res.status(201).json({ success: true, location: loc });
  } catch (err) {
    console.error("❌ Location store error:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to store location." });
  }
});

// ----- Visitor Location Fetch -----
app.get("/api/location", async (req, res) => {
  try {
    const locations = await Location.find().sort({ timestamp: -1 }).limit(100);
    res.json(locations);
  } catch (err) {
    console.error("❌ Location fetch error:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch locations." });
  }
});

// ====== START SERVER ======
// If this file is run directly (node server.js), start the HTTP server.
// Otherwise export the Express `app` so serverless platforms can import it.
if (require.main === module) {
  app.listen(PORT, () =>
    console.log(
      `🚀 Marvel Factory Contact API running!\nListening on http://localhost:${PORT}\nAccepting requests from: ${FRONTEND_URL}`
    )
  );
} else {
  // Export for CommonJS and provide a `default` property for ESM consumers.
  module.exports = app;
  module.exports.default = app;
}