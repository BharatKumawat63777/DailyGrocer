import foodModel from "../models/food_models.js";

import { v2 as cloudinary } from "cloudinary";

// add food item

const addFood = async (req, res) => {
  // Configuration
  const file = req.file;

  let imgUrl = null;
  if (file) {
    try {
      // Promisify the upload_stream
      imgUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        uploadStream.end(file.buffer); // Use the file buffer
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return res
        .status(500)
        .json({ success: false, message: "Image Upload Error" });
    }
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: imgUrl,
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
