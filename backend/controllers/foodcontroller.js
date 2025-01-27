import foodModel from "../models/food_models.js";
// import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// add food item

const addFood = async (req, res) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  let img = req.body.image; //change it finally
  if (img) {
    const uploadedResponse = await cloudinary.uploader.upload(img);
    img = uploadedResponse.secure_url;
    console.log(img);
  }
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: img,
    category: req.body.category,
  });

  try {
    await food.save();

    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//  all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item
const removefood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body._id);
    // const filepath = `uploads/${food.image}`;

    // fs.unlink(filepath, (err) => {
    //   if (err) {
    //     console.error("Error while deleting file:", err);
    //   }
    // });
    const imgId = food.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imgId);

    await foodModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove image

export { addFood, listFood, removefood };
