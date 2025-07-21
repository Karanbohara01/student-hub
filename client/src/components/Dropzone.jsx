import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload } from 'react-icons/fa';

const Dropzone = ({ onFileAccepted }) => {
  const [isHover, setIsHover] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    // We'll just handle a single file for now
    onFileAccepted(acceptedFiles[0]);
    setIsHover(false);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsHover(true),
    onDragLeave: () => setIsHover(false),
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-4 border-dashed rounded-2xl cursor-pointer transition-colors duration-300
                ${isHover ? 'border-[#6e48aa] bg-purple-50' : 'border-gray-300'}`
      }
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-center">
        <FaFileUpload className={`text-4xl mb-4 ${isHover ? 'text-[#6e48aa]' : 'text-gray-400'}`} />
        <p className="font-bold text-lg">Drag & drop your file here</p>
        <p className="text-gray-500">or click to select a file</p>
        <p className="text-xs text-gray-400 mt-2">(PDF, DOCX, PNG, etc.)</p>
      </div>
    </div>
  );
};

export default Dropzone;