"use client";

import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";

interface HashContainerProps {
  disabled?: boolean;
}

const HashContainer = ({ disabled = false }: HashContainerProps) => {
  const [hashArr, setHashArr] = useState<string[]>([]);
  const [hashVal, setHashVal] = useState<string>("");
  const [isComposing, setIsComposing] = useState(false); // IME 조합 상태

  const onCompositionStart = () => {
    setIsComposing(true);
  };

  const onCompositionEnd = () => {
    setIsComposing(false);
  };

  const onKeyUpCreateHash = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isComposing) {
        if (hashVal.trim() === "") {
          return;
        }
        setHashArr((prev) => {
          const updatedHashArr = new Set([...prev, hashVal.trim()]);
          return Array.from(updatedHashArr);
        });
        setHashVal("");
      }
    },
    [hashVal, isComposing]
  );

  const onChangeHash = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHashVal(e.target.value);
  }, []);

  return (
    <div>
      <Input
        type="text"
        value={hashVal}
        onChange={onChangeHash}
        onKeyUp={onKeyUpCreateHash}
        onCompositionStart={onCompositionStart} // IME 조합 시작
        onCompositionEnd={onCompositionEnd} // IME 조합 완료
        disabled={disabled}
      />
      <div className="p-3 rounded-sm my-2">
        {hashArr?.map((e, i) => (
          <span
            key={i}
            className="inline-block text-sm font-sans rounded-full border py-1 px-2 m-1"
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HashContainer;
