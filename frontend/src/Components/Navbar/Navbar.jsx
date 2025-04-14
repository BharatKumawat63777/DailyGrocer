import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const {
    foodlist,
    searchbar,
    setSearchbar,
    getTotalCartAmount,
    token,
    setToken,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    handlersearch();
  }, [inputText]);

  const handlersearch = () => {
    
    const filterData = foodlist.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase()) ||item.description.toLowerCase().includes(inputText.toLowerCase())
    );
    setSearchbar(filterData);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.E_commerce_logo2} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Groceries
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-app")}
          className={menu === "Mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
        <Link
          to="/chat"
          onClick={() => setMenu("chat")}
          className={menu === "chat" ? "active" : ""}
        >
          Chat
        </Link>
      </ul>
      <div className="navbar-right">
        <div id="searchbar" onClick={() => handlersearch()}>
          <input
            type="text"
            placeholder="Seaching...."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <img src={assets.search_icon} alt="" className="search-icon" />
        </div>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartAmount() > 0 ? <div className="dot"></div> : ""}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
