"use client";
import { useMusic } from "@/src/context/MusicContext";
import { Music, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MusicComp = () => {
  const cheers = useRef<HTMLAudioElement | null>(null);
  const { isMusic, setIsMusic } = useMusic();
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태 관리

  useEffect(() => {
    if (!cheers.current) {
      cheers.current = new Audio("/music/cheers.mp3");
      cheers.current.loop = true; // 자동 반복 X
    }
    if (isMusic) {
      cheers.current.play().catch((error) => {
        console.log("Failed to play:", error);
      });
    }
    return () => {
      cheers.current?.pause();
      cheers.current?.removeEventListener("ended", handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleEnded = () => {
    if (isMusic && cheers.current) {
      cheers.current.currentTime = 0; // 처음으로 되돌림
      cheers.current.play().catch((error) => {
        console.log("Failed to replay:", error);
      });
    }
  };

  const handleMusic = () => {
    setIsMusic(!isMusic);
  };

  const handleAllowMusic = () => {
    setIsModalOpen(false);
    setIsMusic(true);
    cheers.current?.play();
  };

  const handleDenyMusic = () => {
    setIsModalOpen(false);
    setIsMusic(false);
    cheers.current?.pause();
  };

  return (
    <div>
      {isModalOpen && (
        <MusicModal
          handleAllowMusic={handleAllowMusic}
          handleDenyMusic={handleDenyMusic}
        />
      )}

      <button onClick={handleMusic} className="flex">
        <Music className="size-4 sm:size-5" />
        {isMusic ? (
          <Pause
            className="size-4 sm:size-5"
            aria-label="Play music button in footer"
          />
        ) : (
          <Play
            className="size-4 sm:size-5"
            aria-label="Stop music button in footer"
          />
        )}
      </button>
    </div>
  );
};

function MusicModal({
  handleAllowMusic,
  handleDenyMusic,
}: {
  handleAllowMusic: () => void;
  handleDenyMusic: () => void;
}) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto"
    >
      <div className="bg-white p-6 rounded shadow-md pointer-events-auto">
        <h2 className="text-lg font-bold">음악 재생 허용</h2>
        <p>음악은 스펀지밥을 춤추게해요.</p>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleAllowMusic}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            aria-label="accept to play Music Button from Moal"
          >
            재생
          </button>
          <button
            onClick={handleDenyMusic}
            className="px-4 py-2 bg-red-500 text-white rounded"
            aria-label="reject to play music button from modal"
          >
            거부
          </button>
        </div>
      </div>
    </div>
  );
}
export default MusicComp;
