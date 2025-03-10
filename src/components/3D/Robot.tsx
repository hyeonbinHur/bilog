"use client";
import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useMusic } from "@/src/context/MusicContext";

const Robot = () => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("sponge.glb");
  const { actions } = useAnimations(animations, scene);
  const { isMusic } = useMusic();

  // 애니메이션 초기 설정
  useEffect(() => {
    console.log(actions); // 실제 액션 이름 확인
    const actionName = Object.keys(actions)[0]; // 첫 번째 애니메이션 이름 가져오기
    if (actions[actionName]) {
      actions[actionName].play();
      actions[actionName].paused = !isMusic; // 초기 상태는 isMusic에 따라 설정
    }
  }, [actions, isMusic]);

  // 프레임마다 애니메이션 제어
  useFrame(() => {
    // 카메라를 매개변수로 받아옴
    if (group.current) group.current.rotation.y = -1;
    const actionName = Object.keys(actions)[0];
    const action = actions[actionName];
    if (action) {
      action.setEffectiveTimeScale(3.4); // 애니메이션 속도를 3배로 설정
      action.paused = !isMusic; // isMusic이 true일 때만 애니메이션 재생
    }
  });

  return (
    <>
      <group ref={group} position={[0, -3.8, 4]} scale={[130, 130, 130]}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default Robot;
