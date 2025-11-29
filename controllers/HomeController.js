const HomeModel = require("../models/HomeModel");

//store slide url images
const createSlide = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const storeImage = await HomeModel.create({ imageUrl });
    return res.status(200).json({
        storeImage,
        message:"Slide image url stored successfully"
    })
  } catch {
     return res.status(500).json({
        message:"Slide Image Not Stored!!!"
    })
  }
};

//get slide images
const getSlide = async (req, res) => {
    try{
        const getImages=await HomeModel.find();
        return res.status(200).json({
            getImages,
            message:"All images get successfully"
        })
    }
    catch{
         return res.status(400).json({
            message:"Something went wrong"
        })

    }
};
module.exports = {
  createSlide,
  getSlide,
};
