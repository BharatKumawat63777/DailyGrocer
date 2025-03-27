import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
        let itemInfo = foodlist.find((product) => product._id == item);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        } else {
          totalAmount += cartItem[item];
        }
      }
    }

    return totalAmount;
  };

  let isFirstFetch = true; // Flag to track first-time fetch

  let toastId;
  const fetchFoodlist = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodlist(response.data.data);

      if (isFirstFetch) {
        toast.update(toastId, {
          render: "Data fetched successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        isFirstFetch = false; // Prevent spinner from showing again
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      if (isFirstFetch) {
        toast.update(toastId, {
          render: "Failed to fetch data",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };
  useEffect(() => {
    toastId = toast.loading("Fetching data..."); // Show spinner only first time
    fetchFoodlist();
    const interval = setInterval(() => {
      fetchFoodlist(); // Auto-fetch every 10 seconds
    }, 10000); // 10,000ms = 10 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getcartitem = async (token) => {
    const getcart = await axios.post(
      url + "/api/cart/get",
      {},
      {
        headers: { token },
      }
    );

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
