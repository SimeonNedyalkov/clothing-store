import { Mesh, Material } from "three";
import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    Object_2: Mesh;
    Object_3: Mesh;
    Object_4: Mesh;
  };
  materials: {
    defaultMat: Material;
  };
};
