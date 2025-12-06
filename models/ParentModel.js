const mongoose = require("mongoose");
const ParentSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: true,
    },
     phone: {
      type: String,
      required: true,
    },
     studentName: {
      type: String
    },

  },
  { timestamps: true }
);

const ParentModel = mongoose.model("parents", ParentSchema);
module.exports = ParentModel;
