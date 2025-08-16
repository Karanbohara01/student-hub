// import { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

// const FileViewer = ({ fileUrl }) => {
//   const [numPages, setNumPages] = useState(null);
//   const fileExtension = fileUrl.split('.').pop().toLowerCase();
//   const fullFileUrl = `${import.meta.env.VITE_BACKEND_URL}${fileUrl}`;

//   if (['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)) {
//     return <img src={fullFileUrl} alt="Note preview" className="w-full h-auto rounded-lg border-2 border-black" />;
//   }
//   if (fileExtension === 'pdf') {
//     return (
//       <div className="border-2 border-black rounded-lg overflow-hidden">
//         <div className="max-h-[80vh] overflow-y-auto bg-gray-200 p-4">
//           <Document
//             file={fullFileUrl}
//             onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//             className="flex flex-col items-center"
//           >
//             {Array.from(new Array(numPages || 0), (el, index) => (
//               <div key={`page_${index + 1}`} className="mb-4 shadow-lg">
//                 <Page
//                   pageNumber={index + 1}
//                   renderTextLayer={false}
//                 />
//               </div>
//             ))}
//           </Document>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 text-center bg-gray-100 rounded-lg">
//       <p style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//         Preview is not available for this file type.
//       </p>
//     </div>
//   );
// };

// export default FileViewer;

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

const FileViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(null);
  const fileExtension = fileUrl.split('.').pop().toLowerCase();
  const fullFileUrl = `${import.meta.env.VITE_BACKEND_URL}${fileUrl}`;

  // Handle responsive page width
  useEffect(() => {
    const updatePageWidth = () => {
      // For mobile devices, use full width minus padding
      if (window.innerWidth < 768) {
        setPageWidth(window.innerWidth - 40); // 40px padding (20px each side)
      }
      // For tablets, use 90% of container width
      else if (window.innerWidth < 1024) {
        setPageWidth(Math.min(650, window.innerWidth - 80));
      }
      // For desktop, use a fixed maximum width
      else {
        setPageWidth(800);
      }
    };

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);

    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);

  if (['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)) {
    return (
      <img
        src={fullFileUrl}
        alt="Note preview"
        className="w-full h-auto rounded-lg border-2 border-black max-h-[80vh] object-contain"
      />
    );
  }

  if (fileExtension === 'pdf') {
    return (
      <div className="border-2 border-black rounded-lg overflow-hidden w-full">
        <div className="max-h-[80vh] overflow-y-auto bg-gray-200 p-2 sm:p-4">
          <Document
            file={fullFileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="flex flex-col items-center"
            loading={
              <div className="flex justify-center items-center h-64">
                <p>Loading PDF...</p>
              </div>
            }
          >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div
                key={`page_${index + 1}`}
                className="mb-4 shadow-lg bg-white"
              >
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  loading={
                    <div className="flex justify-center items-center h-64">
                      <p>Loading page {index + 1}...</p>
                    </div>
                  }
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