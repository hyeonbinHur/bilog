import { useWorning } from "@/src/context/ErrorContext";
import React from "react";
import { createPortal } from "react-dom";
import WorningModal from "./WorningModal";

const WorningContainer = () => {
  const { worning, setWorning } = useWorning();
  if (!worning) return null;
  const modalRoot = document.getElementById("modal") as HTMLElement | null;
  if (!modalRoot) return null;
  return createPortal(
    <div>
      <WorningModal worning={worning} setWorning={setWorning} />
    </div>,
    modalRoot
  );
};

export default WorningContainer;
