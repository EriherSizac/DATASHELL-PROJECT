"use client";
import React from "react";

export default function Modal({
  isOpen,
  onClose,
  buttonCloseText,
  modalHeader,
  children,
}) {
  if (isOpen) {
    document.body.classList.add("body-no-scroll");
  } else {
    document.body.classList.remove("body-no-scroll");
  }

  return (
    <div
      className={`transition-all duration-250 min-h-screen z-50 inset-0 bg-slate-700 flex align-center items-center justify-center ${
        isOpen ? "fixed" : "hidden"
      }`}
    >
      <div className="">
        <div className="flex flex-col gap-4 align-center items-center justify-center p-6 bg-white rounded max-w-2xl">
          <h2 className="text-center">{modalHeader}</h2>
          {children}
          <button className="p-3 bg-black text-white" onClick={onClose}>
            {buttonCloseText}
          </button>
        </div>
      </div>
    </div>
  );
}
