'use client';

import React, { useEffect, useState } from 'react';

interface PDFViewerProps {
  pdfUrl: string | null;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [isClient, setIsClient] = useState(false);

  // This prevents hydration errors by only rendering on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No document loaded</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-300px)] min-h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <iframe
        src={`${pdfUrl}#view=FitH`}
        className="w-full h-full"
        title="PDF Viewer"
      />
    </div>
  );
}

// Note: For a more advanced PDF viewer implementation, you may want to consider:
// 1. Using react-pdf library (https://github.com/wojtekmaj/react-pdf) for more features
// 2. Adding pagination controls for multi-page documents
// 3. Adding zoom controls for better 

'use client';

import React, { useEffect, useState } from 'react';

interface PDFViewerProps {
  pdfUrl: string | null;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [mounted, setMounted] = useState(false);

  // This prevents hydration errors by only rendering on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>;
  }

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No document loaded</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-300px)] min-h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <iframe
        src={`${pdfUrl}#view=FitH`}
        className="w-full h-full"
        title="PDF Viewer"
      />
    </div>
  );
}