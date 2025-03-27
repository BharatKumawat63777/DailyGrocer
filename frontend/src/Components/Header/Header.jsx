import React, { useEffect, useState } from "react";
import "./Header.css";
import { assets } from "../../assets/frontend_assets/assets";

const Header = () => {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      img: assets.sugar1,
      title: "Sugar is good for health",
      description: "Step into a world of flawless transformations...",
    },
    {
      img: assets.ghee,
      title: "Ghee for using health",
      description: "Immerse yourself in the beauty of henna...",
    },
    {
      img: assets.oil,
      title: "Oil for using vegetables",
      description: "From kids to adults, enjoy personalized hair solutions...",
    },
    {
      img: assets.bean,
      title: "Beans have a lot of protein",
      description:
        "Explore skincare secrets, makeup trends, and self-care rituals...",
    },
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle previous slide
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Handle next slide
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="header-container">
      <div className="header-carousel-wrapper">
        {/* Title */}
        <div className="header-title">
          <h1>Store Item View</h1>
        </div>

        {/* Carousel */}
        <div className="header-carousel">
          {/* Slide */}
          <div className="header-slide">
            <img
              src={slides[index].img}
              alt={slides[index].title}
              className="header-carousel-img"
            />

            <h2>{slides[index].title}</h2>
            <p>{slides[index].description}</p>
          </div>
        </div>

        {/* Navigation Handles */}
        <button onClick={prevSlide} className="header-nav-button header-left">
          ❮
        </button>
        <button onClick={nextSlide} className="header-nav-button header-right">
          ❯
        </button>
      </div>
    </div>
  );
};

export default Header;
