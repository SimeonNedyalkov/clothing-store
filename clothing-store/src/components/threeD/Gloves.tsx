import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "./threeDType";
import { useFrame, useThree } from "react-three-fiber";
import glovesScene from "../../assets/threeD/srg_glove.glb";
import { a } from "@react-spring/three";

interface PropsInterface {
  position: number[];
  scale: number[];
  rotation: number[];
}
interface GlovesProps {
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  props: PropsInterface;
}

export default function Gloves({
  isRotating,
  setIsRotating,
  ...props
}: GlovesProps) {
  const { nodes, materials } = useGLTF(glovesScene) as GLTFResult;
  const glovesRef = useRef();
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const rotationSpead = useRef(0);
  const dampingFactor = 0.95;
  const handlePointerDown = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };
  const handlePointerUp = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const delta = (clientX - lastX.current) / viewport.width;
    glovesRef.current.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpead.current = delta * 0.01 * Math.PI;
  };
  const handlePointerMove = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      handlePointerUp(e);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      glovesRef.current.rotation.y += 0.01 * Math.PI;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      glovesRef.current.rotation.y -= 0.01 * Math.PI;
    }
  };
  const handleKeyUp = (e: any) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };
  useEffect(() => {
    document.addEventListener("pointerup", handlePointerUp),
      document.addEventListener("pointerdown", handlePointerDown),
      document.addEventListener("pointermove", handlePointerMove),
      document.addEventListener("keydown", handleKeyDown),
      document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("pointerup", handlePointerUp),
        document.removeEventListener("pointerdown", handlePointerDown),
        document.removeEventListener("pointermove", handlePointerMove),
        document.removeEventListener("keydown", handleKeyDown),
        document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);
  //   useFrame(()=>{
  //     if(!isRotating){
  //       rotationSpead.current *= dampingFactor;
  //       if(Math.abs(rotationSpead.current) <0.001){
  //         rotationSpead.current = 0
  //       }
  //     }else{
  //       const rotation = glovesRef.current.rotation.y;
  //       const normalizedRotation =
  //   ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  // // Set the current stage based on the island's orientation
  // switch (true) {
  //   case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
  //     setCurrentStage(4);
  //     break;
  //   case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
  //     setCurrentStage(3);
  //     break;
  //   case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
  //     setCurrentStage(2);
  //     break;
  //   case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
  //     setCurrentStage(1);
  //     break;
  //   default:
  //     setCurrentStage(null);
  //     }
  //   }})
  return (
    <a.group {...props} ref={glovesRef} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.113}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.defaultMat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.defaultMat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.defaultMat}
        />
      </group>
    </a.group>
  );
}
