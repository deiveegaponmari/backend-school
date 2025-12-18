const ParentModel = require("../models/ParentModel");

const ParentController = async (req, res) => {
  try {
    const { parentName, email, studentName } = req.body;
    await ParentModel.create({
      parentName,
      email,
      studentName,
    });
    const parents = await ParentModel.find(); 
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: "Failed to load parents" });
  }
};

const getParentEmails=async (req,res) =>{
  try{
    const parentEmails=await ParentModel.find({},"email -_id"); // return only phone  fields
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
