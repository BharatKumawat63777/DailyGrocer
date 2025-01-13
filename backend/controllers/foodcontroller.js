import foodModel from "../models/food_models.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`; //change it finally
  // console.log(`Uploaded file: ${image_filename}`);
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    console.log("Successfully");
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
    const filepath = `uploads/${food.image}`;
    console.log("file is ", filepath);
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error("Error while deleting file:", err);
      }
    });

    const result = await foodModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove image

export { addFood, listFood, removefood };
