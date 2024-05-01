import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import * as THREE from "three";

export function App() {
    const texture = useLoader(THREE.TextureLoader, "logo512.png");

    return (
        <Suspense fallback={null}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Plane
                    args={[10, 10]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                >
                    <meshStandardMaterial attach="material" map={texture} />
                </Plane>

                <OrbitControls />
            </Canvas>
        </Suspense>
    );
}
