import React, { useEffect, useRef } from 'react';
import { useScanner } from '../../hooks/useScanner';
import ScannerOverlay from './ScannerOverlay';

export const BarcodeScanner = ({ onScanSuccess }) => {
  const videoRef = useRef(null);
  const { startScanning, stopScanning, isScanning, error } = useScanner();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      startScanning(video, (barcode) => {
        // Stop scanning immediately and trigger success callback
        stopScanning(video);
        onScanSuccess(barcode);
      });
    }

    return () => {
      stopScanning(video);
    };
  }, [startScanning, stopScanning, onScanSuccess]);

  return (
    <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden bg-black border border-gray-100 flex items-center justify-center select-none shadow-md">
      <video 
        ref={videoRef} 
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />
      
      {/* Scanner framing overlay */}
      {isScanning && <ScannerOverlay />}

      {error && (
        <div className="absolute inset-0 bg-gray-900/90 flex flex-col items-center justify-center p-6 text-center text-white z-20">
          <i className="bx bx-camera-off text-4xl text-red-400 mb-3" />
          <h4 className="font-bold text-base mb-1">Camera Unreachable</h4>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
            {error || "Camera access denied. Please verify browser permissions, or enter the barcode manually below."}
          </p>
        </div>
      )}

      {!isScanning && !error && (
        <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center p-6 text-center text-white z-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500 border-r-transparent border-b-2 border-primary-500 border-l-transparent" />
          <span className="text-xs font-semibold text-gray-450 mt-3">Initializing Camera Viewport...</span>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
