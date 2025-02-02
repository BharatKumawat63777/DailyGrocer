import express from "express";

import {
  addFood,
  listFood,
  removefood,
} from "../controllers/foodcontroller.js";
import multer from "multer"; //Image storage system
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const foodRouter = express.Router();

// Configure Cloudinary (already done earlier in your app)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Import multer
const storage = multer.memoryStorage();
const upload = multer({ storage });


foodRouter.post("/add", upload.single("image"), addFood); //, upload.single("image")
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removefood);

export default foodRouter;
