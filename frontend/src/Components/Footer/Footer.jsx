import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>Krishna Kirna Store</h2>
          <p>learn about footer in this site</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMAPANY</h2>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <h3>Mr.Ugama Ram ,Mr.Sunil</h3>
            <li>9413575636,7200131568</li>
            <li>krishnakiranastore@gmail.com</li>

          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @krishnakirna.com- all Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
