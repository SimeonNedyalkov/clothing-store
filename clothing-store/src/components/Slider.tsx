import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Cloth from "../types/Cloth";
import { Canvas, useThree } from "@react-three/fiber";
import LoaderForThreeFiber from "./LoaderForThreeFiber";
import Gloves from "./threeD/Gloves";
import Hoodie from "./threeD/Hoodie";
import Shoes from "./threeD/Shoes";
import { Leva } from "leva";
import { useAtom } from "jotai";
import { slideAtom } from "./threeD/elements/Overlay";
import { CameraControls } from "@react-three/drei";
import { Overlay } from "./threeD/elements/Overlay";

export const scenes = [
  {
    path: Gloves,
    mainColor: "#f9c0ff",
    name: "Gloves",
    description: "Futuristic Gloves",
    price: 120,
    gender: "Male",
  },
  {
    path: Hoodie,
    mainColor: "#c0ffe1",
    name: "Hoodie",
    description: "Futuristic Hoodie",
    price: 120,
    gender: "Male",
  },
  {
    path: Shoes,
    mainColor: "#ffdec0",
    name: "Shoes",
    description: "Futuristic Shoes",
    price: 120,
    gender: "Male",
  },
];

const Slider = (props: { allClothes: Cloth[] }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [slide, setSlide] = useAtom(slideAtom);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsOverlayVisible(false);
      setIsOverlayVisible(true);
    }, 2000);
  }, []);
  const adjustClothForScreen = (index: number) => {
    let screenScale = null;
    let screenPosition = [0, 0, 0];
    let rotation = [0.1, 4.7, 0];

    if (innerWidth < 768) {
      if (index === 0) {
        screenScale = [10, 10, 10];
        screenPosition = [0, -25.5, -43]; // Position for Gloves
      } else if (index === 1) {
        screenScale = [14, 14, 14];
        screenPosition = [0, -45.5, -34]; // Position for Hoodie
      } else if (index === 2) {
        screenScale = [5, 5, 5];
        screenPosition = [0, -20.5, -45]; // Position for Shoes
      }
    } else {
      if (index === 0) {
        // Position for Gloves
        if (scenes[index].name == "Gloves" && slide == 0) {
          screenScale = [15, 15, 15];
          screenPosition = [0, -20, -43];
        } else if (scenes[index].name == "Gloves" && slide == 1) {
          screenScale = [8, 8, 8];
          screenPosition = [50, -15, -43];
        } else if (scenes[index].name == "Gloves" && slide == 2) {
          screenScale = [8, 8, 8];
          screenPosition = [-50, -15, -43];
        }
      } else if (index === 1) {
        // Position for Hoodie
        if (scenes[index].name == "Hoodie" && slide == 0) {
          screenScale = [10, 10, 10];
          screenPosition = [-40, -30.5, -34];
        } else if (scenes[index].name == "Hoodie" && slide == 1) {
          screenScale = [20, 20, 20];
          screenPosition = [0, -60, -43];
        } else if (scenes[index].name == "Hoodie" && slide == 2) {
          screenScale = [10, 10, 10];
          screenPosition = [40, -30.5, -34];
        }
      } else if (index === 2) {
        // Position for Shoes
        if (scenes[index].name == "Shoes" && slide == 0) {
          screenScale = [5, 5, 5];
          screenPosition = [70, -17, -75];
        } else if (scenes[index].name == "Shoes" && slide == 1) {
          screenScale = [5, 5, 5];
          screenPosition = [-70, -17, -75];
        } else if (scenes[index].name == "Shoes" && slide == 2) {
          screenScale = [10, 10, 10];
          screenPosition = [0, -25, -75];
        }
      }
    }

    return [screenScale, screenPosition, rotation];
  };
  const renderCloth = (index: number) => {
    const [clothScale, clothPosition, clothRotation] =
      adjustClothForScreen(index);

    if (index === 0) {
      return (
        <Gloves
          key={`gloves`}
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={slide === index}
          setIsRotating={setIsRotating}
        />
      );
    } else if (index === 1) {
      return (
        <Hoodie
          key={`hoodie`}
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={slide === index}
          setIsRotating={setIsRotating}
        />
      );
    } else if (index === 2) {
      return (
        <Shoes
          key={`shoes`}
          position={clothPosition}
          scale={clothScale}
          rotation={clothRotation}
          isRotating={slide === index}
          setIsRotating={setIsRotating}
        />
      );
    }
    return null;
  };
  const CameraHandler = () => {
    const cameraControls = useRef(null);

    useEffect(() => {
      if (!cameraControls.current) return;
      cameraControls.current.setLookAt(0, 0, 30, 0, 0, 0, true);
    }, []);

    return (
      <CameraControls
        ref={cameraControls}
        touches={{ one: 0, two: 0, three: 0 }}
        mouseButtons={{ left: 0, middle: 0, right: 0 }}
      />
    );
  };

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % scenes.length);
  };

  const prevSlide = () => {
    setSlide((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  return (
    <>
      {isMobile ? (
        <div className="slider-container">
          <div className="slider">
            <Leva hidden />
            {isOverlayVisible ? <Overlay /> : <div />}

            <div className="currentSlide">
              <Canvas
                key={`canvas-${slide}`}
                className={`canvas ${
                  isRotating ? "cursor-grabbing" : "cursor-grab"
                }`}
                camera={{ position: [0, 0, 50], near: 0.1, far: 1000, fov: 45 }}
              >
                <Suspense fallback={<LoaderForThreeFiber />}>
                  <CameraHandler />
                  <directionalLight position={[1, 1, 1]} intensity={2} />
                  <ambientLight intensity={0.5} />
                  <hemisphereLight groundColor="#000000" intensity={1} />
                  {/* Render all cloth items */}
                  {renderCloth(slide)}
                </Suspense>
              </Canvas>
            </div>
            <button className="prev" onClick={prevSlide}>
              ❮
            </button>
            <button className="next" onClick={nextSlide}>
              ❯
            </button>
          </div>
        </div>
      ) : (
        <div className="slider-container">
          <div className="slider">
            <Leva hidden />
            {isOverlayVisible ? <Overlay /> : <div />}

            <div className="currentSlide">
              <Canvas
                key={`canvas-${slide}`}
                className={`canvas ${
                  isRotating ? "cursor-grabbing" : "cursor-grab"
                }`}
                camera={{ position: [0, 0, 50], near: 0.1, far: 1000, fov: 45 }}
              >
                <Suspense fallback={<LoaderForThreeFiber />}>
                  <CameraHandler />
                  <directionalLight position={[1, 1, 1]} intensity={2} />
                  <ambientLight intensity={0.5} />
                  <hemisphereLight groundColor="#000000" intensity={1} />
                  {/* Render all cloth items */}
                  {scenes.map((_, index) => renderCloth(index))}
                </Suspense>
              </Canvas>
            </div>
            <button className="prev" onClick={prevSlide}>
              ❮
            </button>
            <button className="next" onClick={nextSlide}>
              ❯
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
