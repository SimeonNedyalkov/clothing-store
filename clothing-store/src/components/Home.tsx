import { useEffect, useState } from "react";
import myImage from "../assets/neon-circle-2.png";
export default function Home() {
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      className={`website-content ${
        isWebsiteVisible
          ? "visible home flex justify-center items-center justify-items-center flex-col"
          : "home flex justify-center items-center justify-items-center flex-col"
      }`}
    >
      <h1 className="text-3xl font-bold underline absolute">Hello world!</h1>
      <div className="">
        <img src={myImage} alt="" className="myImage" />
        <div className="selectCloth absolute">
          <h1 className="">Select a Vehicle Type</h1>
          <p className="">
            As an automotive NVH designer, different types of vehicles confront
            you with different acoustic challenges.
          </p>
        </div>
      </div>
    </div>
  );
}
