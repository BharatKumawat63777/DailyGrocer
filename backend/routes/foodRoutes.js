import express from "express";
import {
  addFood,
  listFood,
  removefood,
} from "../controllers/foodcontroller.js";
import multer from "multer"; //Image storage system

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
foodRouter.post("/add", upload.single("image"), addFood); //, upload.single("image")
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removefood);

export default foodRouter;
