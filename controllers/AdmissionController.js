const AdmissionModel = require("../models/AdmissionModel");
const axios = require("axios");
require("dotenv").config();

const submitAdmission = async (req, res) => {
  try {
    const { studentName, parentName, email, phone, className } = req.body;

    // Save admission
    const admission = await AdmissionModel.create({
      studentName,
      parentName,
      email,
      phone,
      className,
    });

    // ---------- Brevo Email API ----------
    const headers = {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    };

    // Parent Email
    const parentEmail = axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.SENDER_EMAIL,
          name: "Sri Nataraja Primary School",
        },
        to: [{ email }],
        subject: "Admission Form Submitted Successfully",
        htmlContent: `
          <h2>Hello ${parentName},</h2>
          <p>Thank you for submitting the admission form for <strong>${studentName}</strong>.</p>
          <p>We will contact you shortly.</p>
          <br/>
          <p>Regards,<br/>Sri Nataraja Primary School</p>
        `,
      },
      { headers }
    );

    // Admin Email
    const adminEmail = axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.SENDER_EMAIL,
          name: "Sri Nataraja Primary School",
        },
        to: [{ email: process.env.ADMIN_EMAIL }],
        subject: "New Admission Form Received 👨‍🎓",
        htmlContent: `
          <h2>New Admission Submission</h2>
          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Parent Name:</strong> ${parentName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Class Applied:</strong> ${className}</p>
        `,
      },
      { headers }
    );

    await Promise.all([parentEmail, adminEmail]);

    return res.status(200).json({
      admission,
      message: "Form Submitted & Email Sent Successfully!",
    });

  } catch (error) {
    console.error(error.response?.data || error);
    return res.status(500).json({ message: "Email Failed", error });
  }
};

module.exports = { submitAdmission };
