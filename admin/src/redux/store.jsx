import { configureStore } from "@reduxjs/toolkit";
import URL from "./urlSlice";

import ordersReducer from "./reducer";
const store = configureStore({
  reducer: {
    orders: ordersReducer, // Assign orders reducer
    url: URL,
  },
});

export default store;
