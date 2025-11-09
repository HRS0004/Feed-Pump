"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html, useProgress } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function BoilerPumpModel({ isEnhanced }: { isEnhanced: boolean }) {
  const { scene } = useGLTF("/models/boiler_pump.glb");
  scene.scale.set(1.5, 1.5, 1.5);
  scene.position.set(0, -0.5, 0);
  scene.rotation.y = Math.PI / 2;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        mat.transparent = false;
        mat.opacity = 1.0;
        child.castShadow = true;
        child.receiveShadow = true;

        if (isEnhanced) {
          mat.metalness = Math.min(mat.metalness + 0.2, 0.6);
          mat.roughness = Math.max(mat.roughness - 0.1, 0.3);
          mat.envMapIntensity = 0.8;
          if (mat.color) mat.color.multiplyScalar(0.95);
        } else {
          mat.metalness = 0.0;
          mat.roughness = 0.5;
          mat.envMapIntensity = 1.0;
          if (mat.color) mat.color.multiplyScalar(1.05);
        }
        mat.needsUpdate = true;
      }
    });
  }, [isEnhanced, scene]);

  return <primitive object={scene} />;
}

export default function BoilerFeedPump() {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const controlsRef = useRef<any>(null);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-gray-800 to-gray-950">
      <h1 className="text-white text-2xl font-semibold mb-4">3D Boiler Pump Visualization</h1>

      <div className="w-[90%] h-[80vh] bg-gray-900 rounded-2xl shadow-2xl">
        <Canvas camera={{ position: [3, 2, 6], fov: 60 }} shadows>
          <color attach="background" args={['#111827']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
          <pointLight position={[2, 1, 2]} intensity={0.9} color="#ffffff" />
          <Environment files="/hdris/studio_small_09_2k.hdr" background={false} />

          <Suspense fallback={<Loader />}>
            <BoilerPumpModel isEnhanced={isEnhanced} />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableZoom
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
            enablePan={false}
          />
        </Canvas>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-6 py-2 rounded-lg font-medium shadow-md transition-colors duration-300 ${
            autoRotate
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          }`}
        >
          {autoRotate ? "Stop Camera Rotation" : "Start Camera Rotation"}
        </button>

        <button
          onClick={resetView}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium shadow-md transition-colors duration-300"
        >
          Reset Camera View
        </button>
      </div>
    </div>
  );
}
