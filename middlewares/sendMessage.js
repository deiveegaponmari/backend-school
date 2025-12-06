const axios=require('axios');
require('dotenv').config();

 const sendWhatsAppMessage = async (phone, message) => {
  try {
    const url = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`;

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

    console.log("Message sent!");
    return true;
  } catch (error) {
    console.log("Error sending message:", error.response?.data || error);
    return false;
  }
};

module.exports=sendWhatsAppMessage;