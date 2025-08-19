"use client";
import { createContext, useContext, useState } from "react";

interface ClaudeContextType {
  claudeLoading: boolean;
  setCladueLoading: (loading: boolean) => void;
}

const ClaudeContext = createContext<ClaudeContextType | undefined>(undefined);

export const ClaudeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [claudeLoading, setCladueLoading] = useState<boolean>(false);

  return (
    <ClaudeContext.Provider value={{ claudeLoading, setCladueLoading }}>
      {children}
    </ClaudeContext.Provider>
  );
};

export const useClaudeLoading = () => {
  const context = useContext(ClaudeContext);
  if (!context) {
    throw new Error("Claude Context is not detected");
  }
  return context;
};
