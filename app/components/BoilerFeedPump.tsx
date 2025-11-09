"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function BoilerPumpModel() {
  const { scene } = useGLTF("/models/boiler_pump.glb");
  scene.scale.set(1.5, 1.5, 1.5);
  scene.position.set(0, -0.5, 0);
  scene.rotation.y = Math.PI / 2;

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.metalness = 0.7;
        child.material.roughness = 0.4;
      }
    }
  });

  return <primitive object={scene} />;
}

export default function BoilerFeedPump() {
  return (
    <div className="w-full h-[80vh] bg-gray-900 rounded-2xl shadow-2xl">
      <Canvas camera={{ position: [3, 2, 6], fov: 60 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[2, 1, 2]} intensity={0.8} color="#ffffff" />
        <Suspense fallback={null}>
          <BoilerPumpModel />
        </Suspense>
        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
}
