import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "./threeDType";
import { useFrame, useThree } from "react-three-fiber";
import glovesScene from "../../assets/threeD/srg_glove.glb";
import { a } from "@react-spring/three";

export default function Gloves(props: any) {
  const { nodes, materials } = useGLTF(glovesScene) as GLTFResult;
  const glovesRef = useRef();
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
