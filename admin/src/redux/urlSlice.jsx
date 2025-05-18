import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // url: "https://food-delivery-backend-4u6z.onrender.com", // Initial state for the URL
  url: "http://localhost:4000", // this is using website updata with local storage.
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
});

export default urlSlice.reducer;
