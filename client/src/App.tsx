import React, { useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import { OrbitControls } from "@react-three/drei";
import { useSendVideoFrames } from "./hooks/useSendVideoFrames";

function Terrain() {
    const mesh = useRef<Mesh>(null);
    const texture = useLoader(
        TextureLoader,
        "2024-04-07-00_00_2024-04-07-23_59_Sentinel-1_IW_VV+VH_VV_-_decibel_gamma0.png"
    );

    useEffect(() => {
        if (mesh.current == null) return;

        const geometry = mesh.current.geometry;
        const positions = geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] = Math.random() * 1; // Modify the z-coordinate to create heights
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();
    }, []);

    return (
        <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100, 100, 100]} />
            <meshStandardMaterial map={texture} wireframe={false} />
        </mesh>
    );
}

export function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useSendVideoFrames(canvasRef);

    return (
        <Canvas
            ref={canvasRef}
            gl={{ preserveDrawingBuffer: true }}
            style={{
                width: "1280px",
                height: "720px",
                border: "1px solid black",
            }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Terrain />
            <OrbitControls />
        </Canvas>
    );
}
