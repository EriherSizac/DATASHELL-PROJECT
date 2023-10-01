"use client";
import React, { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  buttonCloseText,
  modalHeader,
  children,
  sizeW,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
  }, []);

  return (
    <div
      className={`transition-all duration-250 min-h-screen z-50 inset-0 bg-slate-700/50 flex align-center items-center justify-center ${
        isOpen ? "fixed" : "hidden"
      }`}
    >
      <div className="">
        <div
          className={`pb-4 flex flex-col gap-4 align-center items-center justify-center bg-white rounded-xl w-screen ${
            sizeW ? sizeW : "max-w-xl"
          }`}
        >
          <div className="w-full bg-yellow-400 rounded-t-xl">
            <h2 className="text-center p-6">{modalHeader}</h2>
          </div>
          {children}
          <button className="p-3 bg-black text-white rounded" onClick={onClose}>
            {buttonCloseText}
          </button>
        </div>
      </div>
    </div>
  );
}
