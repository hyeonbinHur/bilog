"use client";
import React, { useRef, useEffect, useState } from "react";
import { Music, Play, Pause } from "lucide-react";
import { useMusic } from "@/src/context/MusicContext";

const MusicComp = () => {
  const cheers = useRef<HTMLAudioElement | null>(null);
  const { isMusic, setIsMusic } = useMusic();
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태 관리

  useEffect(() => {
    cheers.current = new Audio("/music/cheers.mp3");

    if (isMusic) {
      cheers.current.play().catch((error) => {
        console.log("Failed to play:", error);
      });
    }

    return () => {
      cheers.current?.pause();
      if (cheers.current) cheers.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (isMusic) {
      cheers.current?.play().catch((error) => {
        console.log("Failed to play:", error);
      });
    } else {
      cheers.current?.pause();
    }
  }, [isMusic]);

  const handleMusic = () => {
    setIsMusic(!isMusic);
  };

  const handleAllowMusic = () => {
    setIsModalOpen(false); // 사용자가 허용을 클릭하면 모달 닫기
    setIsMusic(true); // 음악 재생 허용
    cheers.current?.play(); // 음악 재생
  };

  const handleDenyMusic = () => {
    setIsModalOpen(false); // 사용자가 거부를 클릭하면 모달 닫기
    setIsMusic(false); // 음악 재생 거부
    cheers.current?.pause(); // 음악 정지
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
          <div className="bg-white p-6 rounded shadow-md pointer-events-auto">
            <h2 className="text-lg font-bold">음악 재생 허용</h2>
            <p>음악을 재생하려면 아래 버튼을 클릭해주세요.</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleAllowMusic}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                음악 재생 허용
              </button>
              <button
                onClick={handleDenyMusic}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                음악 재생 거부
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={handleMusic} className="flex">
        <Music />
        {isMusic ? <Pause /> : <Play />}
      </button>
    </div>
  );
};

export default MusicComp;
