const AnnouncementModel = require("../models/AnnouncementModel");
const ParentModel = require("../models/ParentModel");
const axios = require("axios");

const AnnouncementController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 1️⃣ Get all parents from DB
    const parents = await ParentModel.find({}, "email parentName");

    if (parents.length === 0) {
      return res.status(400).json({ error: "No parents found" });
    }

    // 2️⃣ Save announcement
    const announcement = await AnnouncementModel.create({
      parents: parents.map(p => ({
        email: p.email
      })),
      message,
      status: "pending"
    });

    // 3️⃣ Send email to each parent
    await Promise.all(
      parents.map(parent =>
        axios.post(
          "https://api.brevo.com/v3/smtp/email",
          {
            sender: {
              email: process.env.SENDER_EMAIL,
              name: "Sri Nataraja Primary School",
            },
            to: [{ email: parent.email }],
            subject: "School Announcement",
            htmlContent: `
              <p>Dear Parent,</p>
              <p>${message}</p>
              <br/>
              <p>Regards,<br/>Sri Nataraja Primary School</p>
            `,
          },
          {
            headers: {
              "api-key": process.env.BREVO_API_KEY,
              "Content-Type": "application/json",
            },
          }
        )
      )
    );

    // 4️⃣ Update status
    announcement.status = "sent";
    await announcement.save();

    res.status(200).json({
      success: true,
      message: "Announcement sent to all parents",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send announcement" });
  }
};

module.exports = AnnouncementController;
