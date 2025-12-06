const ParentModel = require("../models/ParentModel");

const ParentController = async (req, res) => {
  try {
    const { parentName, phone, studentName } = req.body;
    await ParentModel.create({
      parentName,
      phone,
      studentName,
    });
    const parents = await ParentModel.find(); // return only phone  fields
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: "Failed to load parents" });
  }
};

const getParentNumbers=async (req,res) =>{
  try{
    const parentNumbers=await ParentModel.find({},"phone -_id");
    res.status(200).json(parentNumbers)
  }
  catch(error){
     res.status(500).json({ error: "Failed to get phone numbers" });
  }
}

module.exports ={
ParentController,
getParentNumbers
}
