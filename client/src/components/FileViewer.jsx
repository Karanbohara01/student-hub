


import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { FaFilePdf, FaFileImage, FaFileAlt } from 'react-icons/fa';

// Set PDF worker path
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

const FileViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const fileExtension = fileUrl.split('.').pop().toLowerCase();
  const fullFileUrl = `${import.meta.env.VITE_BACKEND_URL}${fileUrl}`;

  if (['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)) {
    return <img src={fullFileUrl} alt="Note preview" className="w-full h-auto rounded-lg border-2 border-black" />;
  }

  if (fileExtension === 'pdf') {
    return (
      <div className="border-2 border-black rounded-lg overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto bg-gray-200 p-4">
          <Document
            file={fullFileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="flex flex-col items-center"
          >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div key={`page_${index + 1}`} className="mb-4 shadow-lg">
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false} // Disable text layer for cleaner look
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 text-center bg-gray-100 rounded-lg">
      <p style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
        Preview is not available for this file type.
      </p>
    </div>
  );
};

export default FileViewer;