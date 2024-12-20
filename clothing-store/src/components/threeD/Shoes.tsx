import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import shoesScene from "/threeD/puma_winter_shoe.glb";
import { a } from "@react-spring/three";

interface ShoesProps {
  position: [number, number, number] | null;
  scale: [number, number, number] | null;
  rotation: [number, number, number] | null;
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
}

export default function Shoes({
  isRotating,
  setIsRotating,
  position,
  rotation,
  scale,
}: ShoesProps) {
  const { nodes, materials } = useGLTF(shoesScene) as any;
  const shoesRef = useRef<any>();

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
    if (!isDragging.current || !shoesRef.current) return;

    const deltaX = e.clientX - lastPointerX.current;
    rotationSpeed.current = (deltaX / window.innerWidth) * Math.PI;
    shoesRef.current.rotation.y += rotationSpeed.current;
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
    if (!shoesRef.current) return;
    if (!isRotating && !isDragging.current) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
    }

    shoesRef.current.rotation.y += rotationSpeed.current;
  });

  return (
    <a.group
      position={position || [0, 0, 0]}
      rotation={rotation || [0, 0, 0]}
      scale={scale || [1, 1, 1]}
      ref={shoesRef}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Puma_wintershoe}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Puma_wintershoe}
        />
      </group>
    </a.group>
  );
}
