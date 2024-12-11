import { Suspense, useEffect, useMemo, useState } from "react";
import Cloth from "../types/Cloth";
import { Canvas } from "react-three-fiber";
import LoaderForThreeFiber from "./LoaderForThreeFiber";
import Gloves from "./threeD/Gloves";
import Hoodie from "./threeD/Hoodie";
import Shoes from "./threeD/Shoes";
import { useSpring, animated } from "react-spring";
interface ClothThreeD {
  screenScale: [number, number, number];
  screenPosition: [number, number, number];
  rotation: [number, number, number];
}

const Slider = (props: { allClothes: Cloth[] }) => {
  const [getImages, setGetImages] = useState<string[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const current3Ditems = ["Gloves", "Hoodie", "Shoes"];
  const [previousIndex, setPreviousIndex] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);
  // 3d Cloth adjustments
  const adjustClothForScreen = () => {
    let screenScale = null;
    let screenPosition = [0, 0, 0];
    let rotation = [0.1, 4.7, 0];
    if (innerWidth < 768) {
      if (currentIndex == 0) {
        screenScale = [10, 10, 10];
        screenPosition = [0, -12.5, -43];
      } else if (currentIndex == 1) {
        screenScale = [12, 12, 12];
        screenPosition = [0, -35.5, -34];
      } else if (currentIndex == 2) {
        screenScale = [5, 5, 5];
        screenPosition = [0, -10.5, -45];
      }
    } else {
      if (currentIndex == 0) {
        screenScale = [12, 12, 12];
        screenPosition = [0, -12.5, -43];
      } else if (currentIndex == 1) {
        screenScale = [14, 14, 14];
        screenPosition = [0, -40.5, -34];
      } else if (currentIndex == 2) {
        screenScale = [5, 5, 5];
        screenPosition = [0, -10, -45];
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % current3Ditems.length);
    setPreviousIndex((prevIndex) => (prevIndex + 1) % current3Ditems.length);
    setNextIndex((prevIndex) => (prevIndex + 1) % current3Ditems.length);
  };

  const prevSlide = () => {
    setNextIndex(
      (prevIndex) =>
        (prevIndex - 1 + current3Ditems.length) % current3Ditems.length
    );
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + current3Ditems.length) % current3Ditems.length
    );
    setPreviousIndex(
      (prevIndex) =>
        (prevIndex - 1 + current3Ditems.length) % current3Ditems.length
    );
  };
  const renderCloth = (index: number, isActive: boolean) => {
    if (index == 0) {
      return (
        <Gloves
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={isActive}
          setIsRotating={setIsRotating}
        />
      );
    } else if (index == 1) {
      return (
        <Hoodie
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={isActive}
          setIsRotating={setIsRotating}
        />
      );
    } else if (index == 2) {
      return (
        <Shoes
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={isActive}
          setIsRotating={setIsRotating}
        />
      );
    }
    return null;
  };
  type Camera = {
    position: [number, number, number];
    near: number;
    far: number;
    fov: number;
  };
  console.log(previousIndex);
  const getCameraSettings = (index: number) => {
    switch (index) {
      case 2:
        return {
          position: [0, 0, 30] as [number, number, number],
          fov: 75,
        };
      case 0:
        return {
          position: [0, 15, 15] as [number, number, number],
          fov: 65,
        };
      case 1:
        return {
          position: [0, 75, 30] as [number, number, number],
          fov: 35,
        };
      default:
        return {
          position: [0, 0, 20] as [number, number, number], // Default camera position
          fov: 50, // Default fov
        };
    }
  };
  const cameraSettings1 = useMemo(
    () => getCameraSettings(previousIndex),
    [previousIndex]
  );
  const cameraSettings2 = useMemo(
    () => getCameraSettings(nextIndex),
    [nextIndex]
  );
  // useEffect(() => {}, [currentIndex]);
  // useEffect(() => {
  //   if (previousIndex === 0) {
  //     setCameraPos1({
  //       position: [0, 50, 70],
  //       near: 0.1,
  //       far: 1000,
  //       fov: 75,
  //     });
  //   } else if (previousIndex === 1) {
  //     setCameraPos1({
  //       position: [0, 30, 65],
  //       near: 0.1,
  //       far: 1000,
  //       fov: 65,
  //     });
  //   } else if (previousIndex == 2) {
  //     setCameraPos1({
  //       position: [0, 0, 30],
  //       near: 0.1,
  //       far: 1000,
  //       fov: 75,
  //     });
  //   }
  // }, [previousIndex]);
  // const getCameraSettingsItem2 = useMemo((): Camera => {
  //   if (currentIndex === 0) {
  //     return {
  //       position: [0, -15, 30],
  //       near: 0.1,
  //       far: 1000,
  //       fov: 35,
  //     };
  //   } else if (currentIndex === 1) {
  //     return {
  //       position: [0, 0, 25],
  //       near: 0.1,
  //       far: 1000,
  //       fov: 45,
  //     };
  //   } else {
  //     return {
  //       position: [0, 7, 20],
  //       near: 0.1,
  //       far: 1000,
  //       fov: 95,
  //     };
  //   }
  // }, [currentIndex]);
  console.log(`prev index : ${previousIndex}`);
  console.log(`current index : ${currentIndex}`);
  console.log(`next index : ${nextIndex}`);
  console.log(cameraSettings1);
  console.log(cameraSettings2);
  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slides">
          <div className="pointed-boxLeft"></div>
          <div className="pointed-boxRight"></div>
          {isMobile ? (
            <div className="currentSlide">
              <Canvas
                key={`canvas-${currentIndex}`}
                className={`canvas ${
                  isRotating ? "cursor-grabbing" : "cursor-grab"
                }`}
                camera={{ position: [0, 0, 15], near: 0.1, far: 1000, fov: 45 }}
              >
                <Suspense fallback={<LoaderForThreeFiber />}>
                  <directionalLight position={[1, 1, 1]} intensity={2} />
                  <ambientLight intensity={0.5} />
                  <hemisphereLight groundColor="#000000" intensity={1} />
                  {renderCloth(currentIndex, true)}
                </Suspense>
              </Canvas>
            </div>
          ) : (
            <>
              <div className="prevSlide">
                <Canvas
                  key={`canvas-${currentIndex}`}
                  className={`canvas ${
                    isRotating ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  camera={{
                    position: cameraSettings1.position,
                    near: 0.1,
                    far: 1000,
                    fov: cameraSettings1.fov,
                  }}
                >
                  <Suspense fallback={<LoaderForThreeFiber />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight groundColor="#000000" intensity={1} />
                    {renderCloth(previousIndex, false)}
                  </Suspense>
                </Canvas>
              </div>
              <div className="currentSlide">
                <Canvas
                  key={`canvas-${currentIndex}`}
                  className={`canvas ${
                    isRotating ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  camera={{
                    position: [0, 0, 15],
                    near: 0.1,
                    far: 1000,
                    fov: 45,
                  }}
                >
                  <Suspense fallback={<LoaderForThreeFiber />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight groundColor="#000000" intensity={1} />
                    {renderCloth(currentIndex, true)}
                  </Suspense>
                </Canvas>
              </div>
              <div className="nextSlide">
                <Canvas
                  className={`canvas ${
                    isRotating ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  camera={{
                    position: [0, -15, 30],
                    near: 0.1,
                    far: 1000,
                    fov: 35,
                  }}
                >
                  <Suspense fallback={<LoaderForThreeFiber />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight groundColor="#000000" intensity={1} />
                    {renderCloth(nextIndex, false)}
                  </Suspense>
                </Canvas>
              </div>
            </>
          )}

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
