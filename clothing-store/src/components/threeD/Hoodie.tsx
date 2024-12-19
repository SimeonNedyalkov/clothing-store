import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import hoodieScene from "/threeD/hoodie.glb";
import { a } from "@react-spring/three";

interface PropsInterface {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}
interface HoodieProps {
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  props: PropsInterface;
}

export default function Hoodie({
  isRotating,
  setIsRotating,
  ...props
}: HoodieProps) {
  const { nodes, materials } = useGLTF(hoodieScene) as any;
  const hoodieRef = useRef<any>();

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
    if (!isDragging.current || !hoodieRef.current) return;

    const deltaX = e.clientX - lastPointerX.current;
    rotationSpeed.current = (deltaX / window.innerWidth) * Math.PI;
    hoodieRef.current.rotation.y += rotationSpeed.current;
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
    if (!hoodieRef.current) return;
    if (!isRotating && !isDragging.current) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
    }

    hoodieRef.current.rotation.y += rotationSpeed.current;
  });

  return (
    <a.group {...props} ref={hoodieRef} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 2]} scale={0.002}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Hoodie_Material3758_0.geometry}
            material={materials.Material3758}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Hoodie_Material3748_0.geometry}
            material={materials.Material3748}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Hoodie_Material3754_0.geometry}
            material={materials.Material3754}
          />
        </group>
      </group>
    </a.group>
  );
}
