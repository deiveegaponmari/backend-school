const AnnouncementModel = require("../models/AnnouncementModel");
const axios = require("axios");
require("dotenv").config();

const AnnouncementController = async (req, res) => {
  try {
    const { parents, message } = req.body; // parents = array of phone numbers

    if (!parents || parents.length === 0 || !message?.trim()) {
      return res
        .status(400)
        .json({ error: "Parents list and message required" });
    }

    const newAnnouncement = await EventBookingModel.create({
      parents,
      message,
    });

    // Brevo setup
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // ✅ User email
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "K Selvam Sounds",
      },
      to: [{ email }],
      subject: "Booking Request Received",
      htmlContent: `
        <h3>Hello ${name},</h3>
        <p>Thank you for booking <b>${eventName}</b>.</p>
        <p>We will contact you shortly.</p>
      `,
    });

    // ✅ Admin email
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "K Selvam Sounds",
      },
      to: [{ email: process.env.BREVO_SENDER_EMAIL }],
      subject: `New Booking - ${eventName}`,
      htmlContent: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({
      success: true,
      data: booking,
      msg: "Booking request sent successfully",
    });
  } catch (error) {
    console.error("Event Booking Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = AnnouncementController;
