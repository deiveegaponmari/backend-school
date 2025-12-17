const mongoose = require("mongoose");
const ParentSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: true,
    },
     email: {
      type: String,
      required: true,
    },
     studentName: {
      type: String
    },

  },
  { timestamps: true }
);

const ParentModel = mongoose.model("parent", ParentSchema);
module.exports = ParentModel;
