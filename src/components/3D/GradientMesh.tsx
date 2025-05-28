import { GradientTexture } from "@react-three/drei";

export default function GradientMesh() {
  return (
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
  );
}
