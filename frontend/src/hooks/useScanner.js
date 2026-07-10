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

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
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
