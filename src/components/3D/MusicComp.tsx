"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Play, Pause, Music } from "lucide-react";
const MusicComp = () => {
  const cheers = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    cheers.current = new Audio("/music/cheers.mp3"); // 오디오 객체 생성
    cheers.current.play(); // 자동으로 음악 재생
    setIsPlaying(true); // 재생 상태를 true로 설정
    return () => {
      cheers.current.pause(); // 컴포넌트 언마운트 시 오디오 정지
      cheers.current.currentTime = 0; // 재생 시간을 처음으로 되돌리기
    };
  }, []);

  const playMusic = () => {
    const audio = cheers.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying); // 재생 상태 토글
  };

  return (
    <button onClick={playMusic} className="flex ">
      <Music />
      {isPlaying ? <Play /> : <Pause />}
    </button>
  );
};

export default MusicComp;
