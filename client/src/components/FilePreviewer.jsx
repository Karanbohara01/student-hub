import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Use a stable, compatible version of the PDF worker script
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const FilePreviewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const fileExtension = fileUrl.split('.').pop().toLowerCase();
  const fullFileUrl = `${import.meta.env.VITE_BACKEND_URL}${fileUrl}`;

  // Check for image
  if (['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)) {
    return <img src={fullFileUrl} alt="Note preview" className="w-full h-auto rounded-lg border-2 border-black" />;
  }

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();


  // Check for PDF
  if (fileExtension === 'pdf') {
    return (
      <div className="border-2 border-black">
        <Document file={fullFileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          {Array.from(new Array(numPages || 0), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    );
  }

  // Fallback for other file types
  return (
    <div className="p-4 text-center bg-gray-100 rounded-lg">
      <p style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
        Preview is not available for this file type.
      </p>
    </div>
  );
};

export default FilePreviewer;