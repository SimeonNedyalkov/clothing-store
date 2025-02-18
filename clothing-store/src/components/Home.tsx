import { useEffect, useState } from "react";
import Slider from "./Slider";
import lenionLogo from "../assets/logo/cosmos.png";
import { useAuthContext } from "../contexts/UserContext";
export default function Home() {
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false);
  const [isWebsiteVisibleToggle, setIsWebsiteVisibleToggle] = useState(false);
  const context = useAuthContext();
  useEffect(() => {
    setTimeout(() => {
      setIsWebsiteVisible(false);
      setIsWebsiteVisible(true);
    }, 2000);
  }, []);
  useEffect(() => {
    const timeoutDelay = window.innerWidth <= 768 ? 2800 : 2600;
    setTimeout(() => {
      setIsWebsiteVisibleToggle(false);
      setIsWebsiteVisibleToggle(true);
    }, timeoutDelay);
  }, []);
  console.log(context);
  return (
    <div className={`website-content ${isWebsiteVisible ? "visible" : "home"}`}>
      <div className="image-container">
        <img
          src={lenionLogo}
          alt=""
          className={`background-image ${
            isWebsiteVisibleToggle ? "visibleImage" : "hiddenImage"
          }`}
        />

        <div className="homeSliderContainer">
          <div className="pointed-boxLeft"></div>
          <Slider />
          <div className="pointed-boxRight"></div>
        </div>
      </div>
      <div className="cosmosCollection">
        <span>COSMOS</span>
        <span>COLLECTION</span>
      </div>

      <div className="toggleButtonContainer justify-items-end content-end items-end">
        <div className="newCollectionContainer flex flex-col justify-items-end content-end items-end">
          <span className="newCollectionContainerTextN">
            Newest collection on LENION
          </span>
          <span className="">with integrated AI</span>
          <div className="flex flex-row mt-2">
            <input type="checkbox" id="switch" />
            {isWebsiteVisibleToggle ? (
              <label className="addToCartButton" htmlFor="switch">
                Toggle
              </label>
            ) : (
              <div></div>
            )}
            <span className="addToCart">Add to cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}
