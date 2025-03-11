"use client";
import React, { createContext, useContext, useState } from "react";
import ErrorContainer from "../components/error/ErrorContainer";
import WorningContainer from "../components/worning/WorningContainer";

interface ErrorContextType {
  error: Error | null;
  setError: (err: Error | null) => void;
  worning: string | null;
  setWorning: (msg: string | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);
  const [worning, setWorning] = useState<string | null>(null);
  return (
    <ErrorContext.Provider value={{ error, setError, worning, setWorning }}>
      {children}
      <ErrorContainer />
      <WorningContainer />
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("Invalid ErrorContext structure detected.");
  }
  return context;
};

export const useWorning = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("Invalid ErrorContext structure detected.");
  }
  return context;
};