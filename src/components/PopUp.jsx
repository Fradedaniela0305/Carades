import React from "react";

export default function PopUp({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      {/* popup box */}
      <div className="relative w-[420px] rounded-2xl bg-white p-6 shadow-xl">

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* title */}
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>

        {/* content */}
        <div className="text-gray-700 space-y-2">
          {children}
        </div>

      </div>
    </div>
  );
}