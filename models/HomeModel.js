const mongoose = require("mongoose");
const HomeSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const HomeModel = mongoose.model("HomeSlide", HomeSchema);
module.exports = HomeModel;
