"use client";
import { useError } from "@/src/context/ErrorContext";
import React from "react";
import { createPortal } from "react-dom";
import ErrorModal from "./ErrorModal";

const ErrorContainer = () => {
  const { error, setError } = useError();

  if (!error) return null; // 에러가 없으면 모달을 렌더링하지 않음

  const modalRoot = document.getElementById("modal") as HTMLElement | null;
  if (!modalRoot) return null; // modal이 없으면 모달을 렌더링하지 않음

  return createPortal(
    <div>
      <ErrorModal err={error} setError={setError} />
    </div>,
    modalRoot
  );
};

export default ErrorContainer;
