import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "https://food-delivery-backend-4u6z.onrender.com", // Initial state for the URL
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    
  },
});


export default urlSlice.reducer;