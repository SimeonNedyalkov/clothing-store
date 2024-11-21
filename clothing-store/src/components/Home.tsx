import React, { useEffect, useState } from "react";
import Cloth from "../types/Cloth";
import woman from "../assets/home/736cd5394c992967d4ceb8999f72ca0a.jpg";
import man from "../assets/home/c70ca72b5906d5910157814709a08f7d.jpg";
import kid from "../assets/home/R.jfif";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home(props: { allClothes: Cloth[] }) {
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsWebsiteVisible(false);
      setIsWebsiteVisible(true);
    }, 2000);
  }, []);

  // Slick slider settings
  const sliderSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // For mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home">
      <div className={`website-content ${isWebsiteVisible ? "visible" : ""}`}>
        <h1>Welcome to the Website!</h1>
      </div>
    </div>
  );
}
