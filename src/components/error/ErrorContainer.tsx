"use client";
import { useError } from "@/src/context/ErrorContext";
import React from "react";
import { createPortal } from "react-dom";
import ErrorModal from "./ErrorModal";

const ErrorContainer = () => {
  const { error, setError } = useError();
  if (!error) return null;
  const modalRoot = document.getElementById("modal") as HTMLElement | null;
  if (!modalRoot) return null;
  return createPortal(
    <div>
      <ErrorModal err={error} setError={setError} />
    </div>,
    modalRoot
  );
};

export default ErrorContainer;
