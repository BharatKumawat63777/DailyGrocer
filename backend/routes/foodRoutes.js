import express from "express";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  addFood,
  listFood,
  removefood,
} from "../controllers/foodcontroller.js";
// import multer from "multer"; //Image storage system
// import { v2 as cloudinary } from "cloudinary";

const foodRouter = express.Router();

// configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// Image Storage Engine
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "uploads",
//       allowed_formats: ["jpeg", "png", "jpg"],
//       public_id: `${Date.now()}-${file.originalname}`,
//     };
//   },
// });

// const upload = multer({ storage: storage });
foodRouter.post("/add", addFood); //, upload.single("image")
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removefood);

export default foodRouter;
