import React, { useContext, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import Fooditem from "../Fooditem/Fooditem";

const FoodDisplay = ({ category }) => {
  const { foodlist } = useContext(StoreContext);
  useEffect(() => {
    FoodDisplay;
  }, [foodlist]);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodlist.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
