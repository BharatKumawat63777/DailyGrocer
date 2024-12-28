import foodModel from "../models/food_models.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  //   let image_filename = `${req.file.filename}`;  change it finally
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    // image: image_filename,
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



export { addFood, listFood };
