import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
// import { useContext } from "react";
export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  const addToCart = (itemId) => {
    console.log("addtocart item");
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    console.log("Remove item");
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
