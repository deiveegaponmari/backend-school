const ParentModel = require("../models/ParentModel");

//Add parent
const ParentController = async (req, res) => {
  try {
    const { parentName, email, studentName } = req.body;
     if (!parentName || !email) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    //  prevent duplicate emails
    const exists = await ParentModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Parent already exists" });
    }
   const parent= await ParentModel.create({
      parentName,
      email,
      studentName,
    });
  
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ error: "Failed to load parents" });
  }
};

//Get parent email
const getParentEmails=async (req,res) =>{
  try{
    const parentEmails=await ParentModel.find({},"email -_id"); // return only email fields
    res.status(200).json(parentEmails)
  }
  catch(error){
     res.status(500).json({ error: "Failed to get phone numbers" });
  }
}

module.exports ={
ParentController,
getParentEmails
}
