import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
 
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite Item here</h2>
        <p>
          choose form a diverse menu featuring a delectable array of dishes
          crafted with the food
        </p>
        <button onClick={() => navigate("#explore-menu")}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
