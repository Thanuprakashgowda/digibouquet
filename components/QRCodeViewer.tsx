import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Button from './Button';

interface Props {
  url: string;
}

export default function QRCodeViewer({ url }: Props) {
  const qrRef = useRef<SVGSVGElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Add padding and white background
    const padding = 20;
    const size = 200;
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2;
    
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    img.onload = () => {
      ctx?.drawImage(img, padding, padding, size, size);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'pocketpetals-qr.png';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
      <p className="text-xs uppercase tracking-widest text-stone-400">Scan to View</p>
      <QRCodeSVG 
        id="bouquet-qr" 
        value={url} 
        size={180} 
        level="H"
        includeMargin={false}
        fgColor="#44403c" // stone-800
        ref={qrRef}
      />
      <Button variant="outline" size="sm" onClick={handleDownload}>
        Download QR
      </Button>
    </div>
  );
}
