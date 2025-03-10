"use client";
import React, { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // GLTF 타입은 임포트하지 않습니다.
import { useFrame } from "@react-three/fiber";
import { Group, Object3D } from "three"; // Object3D를 임포트합니다.
import { useMusic } from "@/src/context/MusicContext"; // useMusic을 임포트합니다.

interface Leaf extends Object3D {
  direction: number;
  velocity: {
    y: number;
  };
}

const Leafs = () => {
  const group = useRef<Group>(null);
  const [leaves, setLeaves] = useState<Leaf[]>([]); // Leaf 타입을 사용하여 상태를 설정합니다.
  const leafCount = 15; // 나뭇잎 수
  const loader = new GLTFLoader();
  const { isMusic } = useMusic(); // isMusic 값을 가져옵니다.

  useEffect(() => {
    const loadedLeaves: Leaf[] = []; // Leaf 타입을 명시적으로 지정합니다.

    const leafURL = "jelly_fish_spongebob.glb";
    loader.load(leafURL, (gltf: any) => {
      // gltf의 타입을 명시적으로 지정하지 않습니다.
      const leafModel = gltf.scene;

      for (let i = 0; i < leafCount; i++) {
        const leaf: Leaf = leafModel.clone() as Leaf; // Leaf 타입으로 변환합니다.
        leaf.scale.set(0.005, 0.005, 0.005);

        // 초기 위치를 위쪽에서 무작위로 설정
        leaf.position.set(
          (Math.random() - 0.5) * 30, // X 위치: -15에서 15 사이의 무작위로 넓혀줌
          Math.random() * 7, // Y 위치: 5에서 15 사이의 무작위로 설정
          0
        );

        leaf.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        // 랜덤한 방향으로 움직이기 위해 -1 또는 1 값을 설정
        leaf.direction = Math.random() < 0.5 ? -1 : 1; // 방향: 왼쪽(-1) 또는 오른쪽(1)
        console.log(leaf.direction);

        // 아래로 이동하는 속도 설정
        leaf.velocity = {
          y: -(Math.random() * 0.06 + 0.02), // 속도를 -0.02에서 -0.08 사이로 설정
        };

        loadedLeaves.push(leaf);
        group.current?.add(leaf); // 그룹에 추가 (null 체크)
      }
      setLeaves(loadedLeaves);
    });
  }, []);

  useFrame(() => {
    if (isMusic) {
      // isMusic이 true일 때만 나뭇잎이 움직임
      leaves.forEach((leaf) => {
        // 나뭇잎 위치 업데이트
        leaf.position.x += leaf.direction * 0.03; // X축으로 이동
        leaf.position.y += leaf.velocity.y * 0.03; // Y축으로 아래로 이동

        // X축 경계 체크
        if (leaf.position.x < -19) {
          leaf.direction = 1; // 왼쪽 벽에 닿으면 오른쪽으로 반전
        } else if (leaf.position.x > 18) {
          leaf.direction = -1; // 오른쪽 벽에 닿으면 왼쪽으로 반전
        }

        // Y축 경계 체크
        if (leaf.position.y < 0) {
          leaf.velocity.y = Math.abs(leaf.velocity.y); // 바닥에 닿으면 위쪽으로 반전
        } else if (leaf.position.y > 10) {
          leaf.velocity.y = -Math.abs(leaf.velocity.y); // 천장에 닿으면 아래쪽으로 반전
        }

        // 회전 애니메이션
        leaf.rotation.x += 0.009;
        leaf.rotation.y += 0.002;
      });
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* 나뭇잎을 위한 group */}
    </group>
  );
};

export default Leafs;
