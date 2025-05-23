import userModel from "../models/userModel.js";

// Add items to user cart

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userID);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userID, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "error" });
  }
};

// remove items from userCart

const removeFromCart = async (req, res) => {
  try {
    let user = await userModel.findById(req.body.userID);

    let cartData = await user.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userID, { cartData });
    res.json({ success: true, message: "successfully remove from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let user = await userModel.findById(req.body.userID);
    let cartData = await user.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { addToCart, removeFromCart, getCart };
