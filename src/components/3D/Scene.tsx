"use client";
import React from "react";
import dynamic from "next/dynamic";

// Canvas와 GradientTexture, Html 컴포넌트를 동적으로 임포트
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false, // 서버 사이드 렌더링 비활성화
    loading: () => (
      <div className="w-full h-[500px] bg-gradient-to-b from-[#f0e68c] to-[#e6db7b] flex flex-col items-center justify-center overflow-hidden relative">
        <div className="w-16 h-16 border-4 border-[#4f9deb] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-lg font-medium text-[#333] animate-pulse">
          스펀지밥 로딩 중...
        </div>
        <div className="absolute top-10 left-10 w-8 h-8 bg-[#4f9deb20] rounded-full animate-[float_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-[#4f9deb20] rounded-full animate-[float_6s_ease-in-out_infinite_1s]"></div>
        <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-[#4f9deb20] rounded-full animate-[float_5s_ease-in-out_infinite_0.5s]"></div>
      </div>
    ),
  }
);

// Robot과 Leafs 컴포넌트도 동적으로 임포트
const Robot = dynamic(() => import("./Robot"), {
  ssr: false,
  loading: () => null, // Canvas 안에서 렌더링되므로 별도 로딩 UI 불필요
});

const GradientMesh = dynamic(() => import("./GradientMesh"), {
  ssr: false,
  loading: () => null, // Canvas 안에서 렌더링되므로 별도 로딩 UI 불필요
});

const Leafs = dynamic(() => import("./Leafs"), {
  ssr: false,
  loading: () => null,
});

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <color attach="background" args={["#f0e68c"]} />
      <GradientMesh />
      <ambientLight intensity={0.6} color="#ffffff" />
      {/* 조명 강도를 필요에 따라 조정하세요. */}
      <directionalLight position={[-5, -5, -5]} intensity={20} />
      <Robot />
      <Leafs />
    </Canvas>
  );
};

export default Scene;
