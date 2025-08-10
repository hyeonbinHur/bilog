import React from "react";
import { CircleAlert } from "lucide-react";
import { X } from "lucide-react";

interface WorningModalProps {
  worning: string;
  setWorning: (msg: string | null) => void;
}

const WorningModal: React.FC<WorningModalProps> = ({ worning, setWorning }) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        style={{ backdropFilter: "blur(5px)" }}
      ></div>
      <div className="fixed justify-between p-3 items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-72 h-52 flex flex-col z-50 bg-slate-50 shadow-2xl rounded-lg border">
        <button
          className="hover:bg-orange-400 p-0.5 text-slate-500 absolute rounded-full top-2 right-2"
          onClick={() => setWorning(null)}
        >
          <X size={15} />
        </button>
        <div className="h-[50%] flex flex-col justify-center">
          <CircleAlert color="orange" size={60} />
        </div>
        <div className="h-[50%] flex flex-col justify-center items-center w-full">
          <p>{worning}</p>
        </div>
      </div>
    </>
  );
};

export default WorningModal;
