const mongoose = require("mongoose");
const AdmissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    className: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AdmissionModel = mongoose.model("Admissions", AdmissionSchema);
module.exports = AdmissionModel;
