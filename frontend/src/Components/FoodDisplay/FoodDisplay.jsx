import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import Fooditem from "../Fooditem/Fooditem";

const FoodDisplay = ({ category }) => {
  const { foodlist, searchbar, inputText } = useContext(StoreContext);
  const [result, setResult] = useState(foodlist);

  useEffect(() => {
    if (inputText.length === 0) {
      setResult(foodlist);
    } else {
      setResult(searchbar);
    }
  }, [searchbar, foodlist]);

  return (
    <div className="food-display" id="food-display">
      <h2>Available Items in shop</h2>
      <div className="food-display-list">
        {result?.map((item, index) => {
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
