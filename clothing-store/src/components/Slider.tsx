import { useEffect, useState } from "react";
import Cloth from "../types/Cloth";

const Slider = (props: { allClothes: Cloth[] }) => {
  const [getImages, setGetImages] = useState<string[]>([]);
  useEffect(() => {
    if (Array.isArray(props.allClothes)) {
      const uniqueImages = new Set<string>();
      props.allClothes.forEach((item) => {
        uniqueImages.add(item.images[0]);
      });
      const newArr = [...uniqueImages].map((x) => x.split(",")).flat();
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
            className="sliderImage"
            src={`${getImages[currentIndex]}`}
            alt={`${getImages[currentIndex]}`}
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
