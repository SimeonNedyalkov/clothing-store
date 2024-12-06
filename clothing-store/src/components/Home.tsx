import { useEffect, useState } from "react";
import Slider from "./Slider";
import Cloth from "../types/Cloth";
// import myImage from "../assets/neon-circle-2.png";
export default function Home(props: { allClothes: Cloth[] }) {
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsWebsiteVisible(false);
      setIsWebsiteVisible(true);
    }, 2000);
  }, []);

  // // Slick slider settings
  // const sliderSettings = {
  //   arrows: true,
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  return (
    <div className={`website-content ${isWebsiteVisible ? "visible" : "home"}`}>
      <h1 className="">Hello world!</h1>
      <Slider allClothes={props.allClothes} />
    </div>
  );
}
