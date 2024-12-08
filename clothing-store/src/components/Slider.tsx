import { Suspense, useEffect, useState } from "react";
import Cloth from "../types/Cloth";
import { Canvas } from "react-three-fiber";
import LoaderForThreeFiber from "./LoaderForThreeFiber";
import Gloves from "./threeD/Gloves";

const Slider = (props: { allClothes: Cloth[] }) => {
  const [getImages, setGetImages] = useState<string[]>([]);
  const adjustClothForScreen = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];
    if (innerWidth < 768) {
      screenScale = [15.5, 15.5, 15.5];
    } else {
      screenScale = [20, 20, 20];
    }
    return [screenScale, screenPosition, rotation];
  };
  const [clothScale, clothPosition, clothRotation] = adjustClothForScreen();
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
          <div className="pointed-boxLeft"></div>
          <div className="pointed-boxRight"></div>
          <Canvas
            className=""
            camera={{ position: [0, 0, 15], near: 0.1, far: 1000, fov: 75 }}
          >
            <Suspense fallback={<LoaderForThreeFiber />}>
              <directionalLight position={[1, 1, 1]} intensity={2} />
              <ambientLight intensity={0.5} />
              <hemisphereLight groundColor="#000000" intensity={1} />
              <Gloves
                position={clothPosition}
                scale={clothScale}
                rotation={clothRotation}
              />
            </Suspense>
          </Canvas>
          {/* <img
            className="sliderImage"
            src={`${getImages[currentIndex]}`}
            alt={`${getImages[currentIndex]}`}
          /> */}
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
