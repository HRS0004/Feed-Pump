"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function BoilerPumpModel({ isEnhanced }: { isEnhanced: boolean }) {
  const { scene } = useGLTF("/models/boiler_pump.glb");
  scene.scale.set(1.5, 1.5, 1.5);
  scene.position.set(0, -0.5, 0);
  scene.rotation.y = Math.PI / 2;

  scene.traverse((child) => {
    if ((child as any).isMesh && (child as any).material) {
      (child as any).castShadow = true;
      (child as any).receiveShadow = true;
      if (isEnhanced) {
        (child as any).material.metalness = 0.4;
        (child as any).material.roughness = 0.3;
        (child as any).material.envMapIntensity = 1.2;
      } else {
        (child as any).material.metalness = 0;
        (child as any).material.roughness = 0.5;
        (child as any).material.envMapIntensity = 1.0;
      }
      (child as any).material.needsUpdate = true;
    }
  });

  return <primitive object={scene} />;
}

export default function BoilerFeedPump() {
  const [isEnhanced, setIsEnhanced] = useState(false);

  return (
    <div className="w-full h-[80vh] bg-gray-900 rounded-2xl shadow-2xl relative">
      <Canvas camera={{ position: [3, 2, 6], fov: 60 }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[2, 1, 2]} intensity={0.9} color="#ffffff" />
        <Environment files="/hdris/studio_small_09_2k.hdr" background />
        <Suspense fallback={<Loader />}>
          <BoilerPumpModel isEnhanced={isEnhanced} />
        </Suspense>
        <OrbitControls
          enableZoom
          autoRotate
          autoRotateSpeed={0.8}
          enablePan={false}
        />
      </Canvas>
      <button
        onClick={() => setIsEnhanced(!isEnhanced)}
        className={`absolute top-4 right-4 px-6 py-2 rounded-lg font-medium shadow-md transition-colors duration-300 ${
          isEnhanced
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-600 hover:bg-gray-700 text-white"
        }`}
      >
        {isEnhanced ? "Switch to Normal Mode" : "Switch to Enhanced Mode"}
      </button>
    </div>
  );
}
