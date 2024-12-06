import { useEffect, useState } from "react";
import Cloth from "../types/Cloth";

const Slider = (props: { allClothes: Cloth[] }) => {
  const [getImages, setGetImages] = useState<string[]>([]);
  useEffect(() => {
    if (Array.isArray(props.allClothes)) {
      const uniqueImages = new Set<string>();

      // Add the first image of each item to the Set to ensure uniqueness
      props.allClothes.forEach((item) => {
        uniqueImages.add(item.images[0]);
      });

      // Use map() to split the images and return an array of images
      const newArr = [...uniqueImages].map((x) => x.split(",")).flat();

      // Log the newArr to verify the result
      console.log(newArr);

      // Set the result to the state
      setGetImages(newArr);
    }
  }, [props.allClothes]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    console.log(getImages[currentIndex]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % getImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + getImages.length) % getImages.length
    );
  };
  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slides">
          <img
            src={`${getImages[currentIndex]}`}
            width="300"
            height="300"
            alt=""
          />
        </div>
        <button className="prev" onClick={prevSlide}>
          ❮
        </button>
        <button className="next" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Slider;
