"use client";
import React, { createContext, useContext, useState } from "react";
import ErrorContainer from "../components/error/ErrorContainer";

interface ErrorContextType {
  error: Error | null;
  setError: (err: Error | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      <ErrorContainer />
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
