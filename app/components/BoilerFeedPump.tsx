"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html, useProgress } from "@react-three/drei";
import { Suspense, useEffect } from "react";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function BoilerPumpModel() {
  const { scene } = useGLTF("/models/boiler_pump.glb");
  scene.scale.set(1.5, 1.5, 1.5);
  scene.position.set(0, -0.5, 0);
  scene.rotation.y = Math.PI / 2;

  // Analyze and log model information
  React.useEffect(() => {
    let markdown = '# Boiler Pump Model Information\n\n## Meshes and Materials\n\n';
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        const mesh = child as any;
        const material = mesh.material;
        const meshName = mesh.name || 'Unnamed Mesh';
        const matName = material.name || 'Unnamed Material';
        const matType = material.type;
        const color = material.color ? '#' + material.color.getHexString() : 'N/A';
        const metalness = material.metalness !== undefined ? material.metalness : 'N/A';
        const roughness = material.roughness !== undefined ? material.roughness : 'N/A';
        const hasMap = !!material.map;
        const hasNormalMap = !!material.normalMap;
        const hasRoughnessMap = !!material.roughnessMap;
        const hasMetalnessMap = !!material.metalnessMap;
        const hasAoMap = !!material.aoMap;
        const hasEmissiveMap = !!material.emissiveMap;

        markdown += `### Mesh: ${meshName}\n`;
        markdown += `- Material: ${matName}\n`;
        markdown += `- Type: ${matType}\n`;
        markdown += `- Color: ${color}\n`;
        markdown += `- Metalness: ${metalness}\n`;
        markdown += `- Roughness: ${roughness}\n`;
        markdown += `- Has Texture Map: ${hasMap}\n`;
        markdown += `- Has Normal Map: ${hasNormalMap}\n`;
        markdown += `- Has Roughness Map: ${hasRoughnessMap}\n`;
        markdown += `- Has Metalness Map: ${hasMetalnessMap}\n`;
        markdown += `- Has AO Map: ${hasAoMap}\n`;
        markdown += `- Has Emissive Map: ${hasEmissiveMap}\n\n`;
      }
    });
    console.log(markdown);
  }, [scene]);

  scene.traverse((child) => {
    if ((child as any).isMesh) {
      (child as any).castShadow = true;
      (child as any).receiveShadow = true;
      if ((child as any).material) {
        (child as any).material.metalness = 0.7;
        (child as any).material.roughness = 0.4;
      }
    }
  });

  return <primitive object={scene} />;
}
function BoilerPumpModel() {
  const { scene } = useGLTF("/models/boiler_pump.glb");
  scene.scale.set(1.5, 1.5, 1.5);
  scene.position.set(0, -0.5, 0);
  scene.rotation.y = Math.PI / 2;

  scene.traverse((child) => {
    if ((child as any).isMesh) {
      (child as any).castShadow = true;
      (child as any).receiveShadow = true;
      if ((child as any).material) {
        (child as any).material.metalness = 0.7;
        (child as any).material.roughness = 0.4;
      }
    }
  });

  return <primitive object={scene} />;
}

export default function BoilerFeedPump() {
  return (
    <div className="w-full h-[80vh] bg-gray-900 rounded-2xl shadow-2xl">
      <Canvas camera={{ position: [3, 2, 6], fov: 60 }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[2, 1, 2]} intensity={0.9} color="#ffffff" />
        <Environment files="/hdris/studio_small_09_2k.hdr" background />
        <Suspense fallback={<Loader />}>
          <BoilerPumpModel />
        </Suspense>
        <OrbitControls
          enableZoom
          autoRotate
          autoRotateSpeed={0.8}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
