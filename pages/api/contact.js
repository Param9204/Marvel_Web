const nodemailer = require("nodemailer");
const connectDB = require("../../backend/db");

connectDB();

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, company, inquiryType, department, message } =
    req.body || {};

  const htmlBody = `
    <div style="font-family:sans-serif;">
      <h2 style="color:#D7263D;">New Contact Form Submission 📨</h2>
      <table style="border-collapse:collapse;">
        <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone || "-"}</td></tr>
        <tr><td><strong>Company:</strong></td><td>${company || "-"}</td></tr>
        <tr><td><strong>Inquiry Type:</strong></td><td>${inquiryType}</td></tr>
        <tr><td><strong>Department:</strong></td><td>${department || "-"}</td></tr>
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Marvel Factory" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Contact Form Submission - Marvel Factory",
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully.");
    return res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
};
