"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Robot from "./Robot";
import Leafs from "./Leafs";
import { GradientTexture, Html } from "@react-three/drei";
import MusicComp from "./MusicComp";
const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <color attach="background" args={["#f0e68c"]} />

      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 1]}
            colors={["#f0e68c", "#4f9deb"]} // 밝은 노란색과 파란색의 그라데이션
            size={1024}
          />
        </meshBasicMaterial>
      </mesh>

      <ambientLight intensity={0.6} color="#ffffff" />
      {/* 조명 강도를 필요에 따라 조정하세요. */}
      <directionalLight position={[-5, -5, -5]} intensity={20} />
      <Robot />
      <Leafs />
    </Canvas>
  );
};

export default Scene;
