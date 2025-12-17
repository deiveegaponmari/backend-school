const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    parents: [
      {
        parentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        email: String,
        phone: String,
      },
    ],
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // admin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);
