import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <input type="text" placeholder="Enter Your Name" required />
          ) : (
            ""
          )}
          <input type="email" placeholder="Enter Your Email" required />
          <input type="password" placeholder="Enter Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="Link">
          <h3
            onClick={() =>
              setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
            }
          >
            {" "}
            {currState === "Sign Up" ? "Login" : "Sign Up"}
          </h3>
          <p>
            {currState === "Sign Up"
              ? "Aleredy have an Account"
              : "Create a new Account"}
          </p>
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By condition, i agree to the terms of use & privacy policy.</p>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
