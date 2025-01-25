import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { useContext } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const url = "https://food-delivery-backend-4u6z.onrender.com";
  const [token, setToken] = useState("");
  const [foodlist, setFoodlist] = useState([]);

  const addToCart = async (itemId) => {
    console.log("addtocart item");
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    console.log("Remove item");
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = foodlist.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodlist = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodlist(response.data.data);
  };

  const getcartitem = async (token) => {
    const getcart = await axios.post(
      url + "/api/cart/get",
      {},
      {
        headers: { token },
      }
    );
    console.log("Get item : ", getcart.data.cartData);
    setCartItem(getcart.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await getcartitem(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  const contextValue = {
    foodlist,
    setFoodlist,
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
