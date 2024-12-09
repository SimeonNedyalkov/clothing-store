import { Suspense, useEffect, useState } from "react";
import Cloth from "../types/Cloth";
import { Canvas } from "react-three-fiber";
import LoaderForThreeFiber from "./LoaderForThreeFiber";
import Gloves from "./threeD/Gloves";
import Hoodie from "./threeD/Hoodie";

const Slider = (props: { allClothes: Cloth[] }) => {
  const [getImages, setGetImages] = useState<string[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const current3Ditems = ["Gloves", "Hoodie"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3d Cloth adjustments
  const adjustClothForScreen = () => {
    let screenScale = null;
    // let screenPosition = [0, -12.5, -43];
    let screenPosition = null;
    let rotation = [0.1, 4.7, 0];
    if (innerWidth < 768) {
      if (currentIndex == 0) {
        screenScale = [10, 10, 10];
        screenPosition = [0, -12.5, -43];
      } else if (currentIndex == 1) {
        screenScale = [12, 12, 12];
        screenPosition = [0, -35.5, -34];
      }
    } else {
      if (currentIndex == 0) {
        screenScale = [12, 12, 12];
        screenPosition = [0, -12.5, -43];
      } else if (currentIndex == 1) {
        screenScale = [14, 14, 14];
        screenPosition = [0, -40.5, -34];
      }
    }
    return [screenScale, screenPosition, rotation];
  };

  const [clothScale, clothPosition, clothRotation] = adjustClothForScreen();
  // rotating effect
  useEffect(() => {}, []);
  //getting images from server
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
  //making images switch

  const nextSlide = () => {
    // console.log(getImages[currentIndex]);
    // setCurrentIndex((prevIndex) => (prevIndex + 1) % getImages.length);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % current3Ditems.length);
  };

  const prevSlide = () => {
    // setCurrentIndex(
    //   (prevIndex) => (prevIndex - 1 + getImages.length) % getImages.length
    // );
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + current3Ditems.length) % current3Ditems.length
    );
  };
  console.log(currentIndex);
  const renderCloth = () => {
    // Add logic here to check which component should be rendered
    // For example, you could check if the current cloth type is 'Gloves' or 'Hoodie'
    if (currentIndex == 0) {
      return (
        <Gloves
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
        />
      );
    } else if (currentIndex == 1) {
      return (
        <Hoodie
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
        />
      );
    }
    return null;
  };
  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slides">
          <div className="pointed-boxLeft"></div>
          <div className="pointed-boxRight"></div>
          <Canvas
            className={`canvas ${
              isRotating ? "cursor-grabbing" : "cursor-grab"
            }`}
            camera={{ position: [0, 0, 11], near: 0.1, far: 1000, fov: 45 }}
          >
            <Suspense fallback={<LoaderForThreeFiber />}>
              <directionalLight position={[1, 1, 1]} intensity={2} />
              <ambientLight intensity={0.5} />
              <hemisphereLight groundColor="#000000" intensity={1} />
              {renderCloth()}
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
