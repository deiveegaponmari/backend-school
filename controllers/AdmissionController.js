const AdmissionModel = require("../models/AdmissionModel");
const nodemailer = require("nodemailer");
require("dotenv").config();
//console.log(process.env.ADMIN_EMAIL);
const submitAdmission = async (req, res) => {
  try {
    const { studentName, parentName, email, phone, className } = req.body;
    const admission = await AdmissionModel.create({
      studentName,
      parentName,
      email,
      phone,
      className,
    });
    // ------------- Email Sending -------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const parentMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Admission Form Submitted Successfully",
      html: `
        <h2>Hello ${parentName},</h2>
        <p>Thank you for submitting the admission form for <strong>${studentName}</strong>.</p>
        <p>We will contact you shortly.</p>
        <br/>
        <p>Regards,<br/>Sri Nataraja Primary School</p>
      `,
    };

    const adminMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Admission Form Received 👨‍🎓",
      html: `
        <h2>New Admission Submission</h2>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Parent Name:</strong> ${parentName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Class Applied:</strong> ${className}</p>
        <br/>
        <p>Please login to dashboard to review.</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(parentMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);
    return res.status(200).json({
      admission,
      message: "Form Submitted & Email Sent Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
module.exports ={ 
  submitAdmission
};
