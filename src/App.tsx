import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  // Assuming the map tile is located at 'path/to/your/map-tile.jpg'
  const texture = useLoader(THREE.TextureLoader, 'path/to/your/map-tile.jpg');

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" map={texture} />
      </Plane>
      <OrbitControls />
    </Canvas>
  );
}

export default function App() {
  return <Scene />;
}

