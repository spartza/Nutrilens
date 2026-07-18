import { useState, useRef, useCallback } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export const useScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const codeReaderRef = useRef(null);

  const startScanning = useCallback((videoElement, onDecode) => {
    if (!videoElement) return;
    setError(null);
    setIsScanning(true);

    try {
      const reader = new BrowserMultiFormatReader();
      codeReaderRef.current = reader;

      // Start decoding from the default video input device (back camera if available)
      reader.decodeFromVideoDevice(undefined, videoElement, (result, err) => {
        if (result) {
          onDecode(result.text);
        }
        // ZXing throws NotFoundException on every frame where no barcode is found. We ignore it.
        if (err && err.name !== 'NotFoundException') {
          console.debug("Scanner issue:", err.message);
        }
      });
    } catch (e) {
      setError(e.message || "Failed to start camera scanner");
      setIsScanning(false);
    }
  }, []);

  const stopScanning = useCallback((videoElement) => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    
    // Explicitly release camera stream tracks to stop camera feed and turn off flashlight/LED indicator
    if (videoElement && videoElement.srcObject) {
      try {
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
      } catch (e) {
        console.warn("Failed to stop media stream tracks:", e);
      }
    }
    
    setIsScanning(false);
  }, []);

  return {
    isScanning,
    error,
    startScanning,
    stopScanning,
  };
};
