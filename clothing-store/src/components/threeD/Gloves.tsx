import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
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
  const { nodes, materials } = useGLTF(glovesScene) as any;
  const glovesRef = useRef<any>();
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;
  const rotationStep = 0.01 * Math.PI;
  const lastPointerX = useRef(0);
  const isDragging = useRef(false);

  const handlePointerDown = (e: PointerEvent) => {
    isDragging.current = true;
    setIsRotating(true);
    lastPointerX.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setIsRotating(false);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.current || !glovesRef.current) return;

    const deltaX = e.clientX - lastPointerX.current;
    rotationSpeed.current = (deltaX / window.innerWidth) * Math.PI;
    glovesRef.current.rotation.y += rotationSpeed.current;
    lastPointerX.current = e.clientX;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      rotationSpeed.current = rotationStep;
      setIsRotating(true);
    } else if (e.key === "ArrowRight") {
      rotationSpeed.current = -rotationStep;
      setIsRotating(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
      rotationSpeed.current = 0;
    }
  };

  useEffect(() => {
    if (isRotating) {
      window.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  useFrame(() => {
    if (!glovesRef.current) return;
    if (!isRotating && !isDragging.current) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
    }

    glovesRef.current.rotation.y += rotationSpeed.current;
  });

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
