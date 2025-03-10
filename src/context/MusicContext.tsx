"use client";
import React, { createContext, useContext, useState } from "react";

interface MusicContextType {
  isMusic: boolean;
  setIsMusic: (value: boolean) => void;
}
const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMusic, setIsMusic] = useState<boolean>(false);
  return (
    <MusicContext.Provider value={{ isMusic, setIsMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("Invalid MusicContext Structure");
  }
  return context;
};
