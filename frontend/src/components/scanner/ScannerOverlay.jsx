import React from 'react';

export const ScannerOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center select-none z-10">
      {/* Target framing box with darkened backdrop overlay */}
      <div className="relative w-64 h-48 border-2 border-primary-500 rounded-3xl overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
        {/* Glowing laser line */}
        <div className="absolute left-0 w-full h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] animate-scan-line" />
      </div>
      <p className="text-white text-xs font-bold mt-6 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm tracking-widest uppercase">
        Position Barcode Inside Frame
      </p>
    </div>
  );
};

export default ScannerOverlay;
