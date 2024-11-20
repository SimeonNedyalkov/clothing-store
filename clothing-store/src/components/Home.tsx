import React from "react";
import Cloth from "../types/Cloth";
import woman from "../assets/home/736cd5394c992967d4ceb8999f72ca0a.jpg";
import man from "../assets/home/c70ca72b5906d5910157814709a08f7d.jpg";
import kid from "../assets/home/R.jfif";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyThree from "../three/cube";

export default function Home(props: { allClothes: Cloth[] }) {
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
      <div className="homeSquares">
        <div className="categoryCard">
          <img src={man} alt="Men" className="categoryImage" />
          <Link to="/men" className="categoryButton">
            Men
          </Link>
        </div>
        <div className="categoryCard">
          <img src={woman} alt="Women" className="categoryImage" />
          <Link to="/women" className="categoryButton">
            Women
          </Link>
        </div>
        <div className="categoryCard">
          <img src={kid} alt="Kids" className="categoryImage" />
          <Link to="/kids" className="categoryButton">
            Kids
          </Link>
        </div>
      </div>

      <div className="newArrivalsContainer">
        <div className="newArrivals">
          <p className="newArrivalsText">NEW ARRIVALS</p>
          <Link to="/newArrivals" className="newArrivalsTextViewAll">
            VIEW ALL
          </Link>
        </div>

        {/* Slider for New Arrivals */}
        <div className="newArrivalsSlider">
          <Slider {...sliderSettings}>
            {props.allClothes.map((item) => (
              <div key={item?._id} className="newArrivalItem">
                <Link to={`/${item.category}/${item?._id}`}>
                  <div className="newArrivalContent">
                    <img
                      className="newArrivalImage"
                      src={item.images[0]}
                      alt={item.name}
                    />
                    <div className="newArrivalDetails">
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                      <p>${item.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
