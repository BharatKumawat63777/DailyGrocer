import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ebharat637:qwertasd@cluster0.l71v0.mongodb.net/Food-Delivery"
    )
    .then(() => console.log("Mongoose Connect"));
};
