import { useEffect, useState } from "react";
import Slider from "./Slider";
import Cloth from "../types/Cloth";
export default function Home(props: { allClothes: Cloth[] }) {
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsWebsiteVisible(false);
      setIsWebsiteVisible(true);
    }, 2000);
  }, []);

  return (
    <div className={`website-content ${isWebsiteVisible ? "visible" : "home"}`}>
      <div className="homeSliderContainer">
        <div className="pointed-boxLeft"></div>
        <Slider allClothes={props.allClothes} />
        <div className="pointed-boxRight"></div>
      </div>
    </div>
  );
}
