import * as THREE from "three";
import { useEffect, useRef } from "react";
import image from "../assets/home/lenion1-removebg-preview.png"; // Make sure the image path is correct

export default function MyThree() {
  // Type the ref correctly as an HTMLDivElement or null
  const refContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach the renderer's DOM element to the refContainer
    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    // Create a plane geometry instead of a cube geometry
    const geometry = new THREE.PlaneGeometry(5, 5); // Size of the plane (width, height)

    // Load the texture (image) and create a material
    const texture = new THREE.TextureLoader().load(image); // Update with your image path
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    // Create the plane mesh with the geometry and material
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Add lighting to create a more 3D effect
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10); // Adjust light position
    scene.add(light);

    // Add an ambient light to soften the shadows
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Ambient light to brighten shadows
    scene.add(ambientLight);

    // Position camera
    camera.position.z = 7;

    // Animation function to rotate the plane and make it dynamic
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the plane mesh on the X and Y axes to give it a 3D effect
      plane.rotation.x += 0.01;
      plane.rotation.y += 0.01;

      // Render the scene from the perspective of the camera
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize to adjust camera aspect ratio and renderer size
    const handleResize = () => {
      if (refContainer.current) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      // Clean up Three.js resources
      if (refContainer.current && refContainer.current.firstChild) {
        refContainer.current.removeChild(refContainer.current.firstChild);
      }
    };
  }, []);

  // Corrected return statement
  return <div ref={refContainer}></div>;
}
