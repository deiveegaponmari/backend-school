const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    parents: {
      type: [String], // store phone numbers
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const AnnouncementModel = mongoose.model("announcement", AnnouncementSchema);
module.exports = AnnouncementModel;
