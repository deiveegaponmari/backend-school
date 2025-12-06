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

    const url = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`;

    for (const phone of parents) {
      //await sendWhatsAppMessage(phone, message);
      console.log(`Sending WhatsApp message to ${phone}:`, message);
     // const url = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`;

      await axios.post(
        url,
        {
          messaging_product: "whatsapp",
          to: phone,
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    await AnnouncementModel.create({ parents, message, status: "sent" });

    return res.status(200).json({
      success: true,
      message: "Announcement sent successfully",
      //data: newAnnouncement,
    });
  } catch (error) {
     console.error("❌ WhatsApp API Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to send announcement" });
  }
};

module.exports = AnnouncementController;
