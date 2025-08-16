

// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import noteService from '../services/noteService';
// import { toast } from 'react-hot-toast';
// import { FaDownload, FaArrowLeft } from 'react-icons/fa';
// import StarRating from '../components/StarRating';
// import LeaveReview from '../components/LeaveReview';
// import { useCallback } from 'react';
// import useAuthStore from '../store/authStore';
// import { FaBookmark } from 'react-icons/fa';
// import authService from '../services/authService.js';
// import FileViewer from '../components/FileViewer';
// import CommentSection from '../components/CommentSection.jsx';

// const NoteDetailPage = () => {
//   const [note, setNote] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id: noteId } = useParams();
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const { userInfo } = useAuthStore();

//   const fetchNote = useCallback(async () => {
//     try {
//       const data = await noteService.getNoteById(noteId);
//       setNote(data);
//     } catch (error) {
//       toast.error('Could not fetch note details.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [noteId]);

//   useEffect(() => {
//     fetchNote();
//   }, [fetchNote]);

//   const handleSaveNote = async () => {
//     try {
//       await authService.addNoteToFavorites(note._id);
//       toast.success('Note saved to your favorites!');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Could not save note.');
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen p-4" aria-live="polite" aria-busy="true">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
//         <p style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Loading note...</p>
//       </div>
//     </div>
//   );

//   if (!note) return (
//     <div className="flex items-center justify-center min-h-screen p-4" aria-live="polite">
//       <div className="text-center">
//         <p style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Note not found.</p>
//         <Link
//           to="/notes"
//           className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#6e48aa] text-white rounded-lg"
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//           aria-label="Return to notes library"
//         >
//           <FaArrowLeft /> Back to Notes
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <main className="min-h-screen w-full bg-gray-50 p-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg border-4 border-black overflow-hidden">
//         {/* Back Navigation */}
//         <div className="p-4 sm:p-6 border-b-2 border-gray-200">
//           <Link
//             to="/notes"
//             className="inline-flex items-center gap-1 text-[#6e48aa] hover:underline"
//             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             aria-label="Return to notes library"
//           >
//             <FaArrowLeft /> All Notes
//           </Link>
//         </div>

//         {/* Header Section */}
//         <header className="p-4 sm:p-6 border-b-2 border-gray-200 text-center">
//           <h1
//             className="text-2xl sm:text-3xl font-bold text-[#6e48aa] mt-2 break-words"
//             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             id="note-title"
//           >
//             {note.title}
//           </h1>
//           <p
//             className="text-sm text-gray-500 mt-1"
//             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             aria-label={`Uploaded by ${note.postedBy?.name || 'Admin'}`}
//           >
//             Uploaded by {note.postedBy?.name || 'Admin'}
//           </p>

//           <div className="flex justify-center mt-2">
//             <StarRating rating={note.rating} numReviews={note.numReviews} />
//           </div>
//         </header>

//         {/* Metadata Section */}
//         <section className="p-4 sm:p-6 border-b-2 border-gray-200" aria-labelledby="note-metadata-heading">
//           <h2 id="note-metadata-heading" className="sr-only">Note Details</h2>

//           <div
//             className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
//             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//           >
//             <div className="mb-2">
//               <p className="text-xs sm:text-sm font-bold text-gray-500">UNIVERSITY</p>
//               <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`University: ${note.university}`}>
//                 {note.university}
//               </p>
//             </div>

//             {note.faculty && (
//               <div className="mb-2">
//                 <p className="text-xs sm:text-sm font-bold text-gray-500">FACULTY</p>
//                 <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`Faculty: ${note.faculty}`}>
//                   {note.faculty}
//                 </p>
//               </div>
//             )}

//             {note.program && (
//               <div className="mb-2">
//                 <p className="text-xs sm:text-sm font-bold text-gray-500">PROGRAM</p>
//                 <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`Program: ${note.program}`}>
//                   {note.program}
//                 </p>
//               </div>
//             )}

//             {note.semester && (
//               <div className="mb-2">
//                 <p className="text-xs sm:text-sm font-bold text-gray-500">SEMESTER/YEAR</p>
//                 <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`Semester: ${note.semester}`}>
//                   {note.semester}
//                 </p>
//               </div>
//             )}

//             <div className="mb-2">
//               <p className="text-xs sm:text-sm font-bold text-gray-500">SUBJECT</p>
//               <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`Subject: ${note.subject}`}>
//                 {note.subject}
//               </p>
//             </div>

//             {note.courseCode && (
//               <div className="mb-2">
//                 <p className="text-xs sm:text-sm font-bold text-gray-500">COURSE CODE</p>
//                 <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`Course code: ${note.courseCode}`}>
//                   {note.courseCode}
//                 </p>
//               </div>
//             )}

//             {note.academicYear && (
//               <div className="mb-2">
//                 <p className="text-xs sm:text-sm font-bold text-gray-500">ACADEMIC YEAR</p>
//                 <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`Academic year: ${note.academicYear}`}>
//                   {note.academicYear}
//                 </p>
//               </div>
//             )}

//             {note.professor && (
//               <div className="mb-2">
//                 <p className="text-xs sm:text-sm font-bold text-gray-500">PROFESSOR</p>
//                 <p className="text-base sm:text-lg font-bold text-[#6e48aa]" aria-label={`Professor: ${note.professor}`}>
//                   {note.professor}
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Description Section */}
//         {note.description && (
//           <section className="p-4 sm:p-6 border-b-2 border-gray-200" aria-labelledby="note-description-heading">
//             <h2
//               id="note-description-heading"
//               className="text-xl sm:text-2xl font-bold text-[#6e48aa] mb-2"
//               style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             >
//               Description
//             </h2>
//             <div className="prose max-w-none">
//               <p
//                 className="text-sm sm:text-base"
//                 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//               >
//                 {note.description}
//               </p>
//             </div>
//           </section>
//         )}

//         {/* Tags Section */}
//         {note.tags && note.tags.length > 0 && (
//           <section className="p-4 sm:p-6 border-b-2 border-gray-200" aria-labelledby="note-tags-heading">
//             <h3
//               id="note-tags-heading"
//               className="text-lg sm:text-xl font-bold text-gray-700 mb-2"
//               style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             >
//               Tags
//             </h3>
//             <ul className="flex flex-wrap gap-2" aria-label="Note tags">
//               {note.tags.map(tag => (
//                 <li key={tag}>
//                   <span
//                     className="text-purple-800 text-xs sm:text-sm font-bold py-1"
//                     aria-label={`Tag: ${tag}`}
//                     style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                   >
//                     #{tag}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {/* File Preview Section */}
//         <section className="p-4 sm:p-6 border-b-2 border-gray-200">
//           <h2
//             className="text-xl sm:text-2xl font-bold text-[#6e48aa] mb-4"
//             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//           >
//             Note Preview
//           </h2>
//           <div className="rounded-lg overflow-hidden border-2 border-gray-300">
//             <FileViewer fileUrl={note.filePath} />
//           </div>
//         </section>

//         {/* Action Buttons Section */}
//         <section className="p-4 sm:p-6 border-b-2 border-gray-200">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             {userInfo && (
//               <button
//                 onClick={handleSaveNote}
//                 className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 shadow-md border-2 border-black transition-all"
//                 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//               >
//                 <FaBookmark />
//                 <span className="whitespace-nowrap">SAVE TO FAVORITES</span>
//               </button>
//             )}

//             <a
//               href={`${import.meta.env.VITE_BACKEND_URL}${note.filePath}`}
//               download={`${note.title.replace(/\s+/g, '_')}.${note.filePath.split('.').pop()}`}
//               className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md border-2 border-black transition-all"
//               style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//               aria-label={`Download note: ${note.title}`}
//             >
//               <FaDownload aria-hidden="true" />
//               <span className="whitespace-nowrap">DOWNLOAD NOTE</span>
//             </a>
//           </div>

//           {(note.fileSize || note.fileType) && (
//             <div className="flex flex-wrap justify-center gap-4 mt-4 text-center">
//               {note.fileSize && (
//                 <p
//                   className="text-xs sm:text-sm text-gray-500"
//                   style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                   aria-label={`File size: ${note.fileSize}`}
//                 >
//                   File size: {note.fileSize}
//                 </p>
//               )}
//               {note.fileType && (
//                 <p
//                   className="text-xs sm:text-sm text-gray-500"
//                   style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                   aria-label={`File type: ${note.fileType}`}
//                 >
//                   File type: {note.fileType.toUpperCase()}
//                 </p>
//               )}
//             </div>
//           )}
//         </section>

//         {/* Review Section */}
//         <section className="p-4 sm:p-6 border-b-2 border-gray-200">
//           {!showReviewForm && userInfo && (
//             <div className="text-center">
//               <button
//                 onClick={() => setShowReviewForm(true)}
//                 className="px-4 sm:px-6 py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 shadow-md border-2 border-black transition-all"
//                 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//               >
//                 Leave a Review
//               </button>
//             </div>
//           )}
//           {showReviewForm && userInfo && (
//             <LeaveReview
//               targetId={note._id}
//               reviewType="note"
//               onReviewSubmitted={() => {
//                 setShowReviewForm(false);
//                 fetchNote();
//               }}
//             />
//           )}
//         </section>

//         {/* Comments Section */}
//         <section className="p-4 sm:p-6">
//           <CommentSection noteId={note._id} />
//         </section>
//       </div>
//     </main>
//   );
// };

// export default NoteDetailPage;

import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import noteService from '../services/noteService';
import { toast } from 'react-hot-toast';
import { FaDownload, FaArrowLeft, FaBookmark } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import LeaveReview from '../components/LeaveReview';
import useAuthStore from '../store/authStore';
import authService from '../services/authService';
import FileViewer from '../components/FileViewer';
import CommentSection from '../components/CommentSection';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { id: noteId } = useParams();
  const { userInfo } = useAuthStore();

  const fetchNote = useCallback(async () => {
    try {
      const data = await noteService.getNoteById(noteId);
      setNote(data);
    } catch (error) {
      toast.error('Could not fetch note details.', error);
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  const handleSaveNote = async () => {
    try {
      await authService.addNoteToFavorites(note._id);
      toast.success('Note saved to your favorites!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save note.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          <p className="text-lg font-medium text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <div>
          <p className="text-lg text-gray-600">Note not found.</p>
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <FaArrowLeft /> Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Back Navigation */}
        <div className="px-6 py-4 border-b border-gray-200">
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 text-purple-600 hover:underline"
          >
            <FaArrowLeft /> All Notes
          </Link>
        </div>

        {/* Header */}
        <header className="px-6 py-6 border-b border-gray-200 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Uploaded by {note.postedBy?.name || 'Admin'}
          </p>
          <div className="flex justify-center mt-2">
            <StarRating rating={note.rating} numReviews={note.numReviews} />
          </div>
        </header>

        {/* Metadata */}
        <section className="px-6 py-6 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <MetaItem label="University" value={note.university} />
            {note.faculty && <MetaItem label="Faculty" value={note.faculty} />}
            {note.program && <MetaItem label="Program" value={note.program} />}
            {note.semester && <MetaItem label="Semester/Year" value={note.semester} />}
            <MetaItem label="Subject" value={note.subject} />
            {note.courseCode && <MetaItem label="Course Code" value={note.courseCode} />}
            {note.academicYear && <MetaItem label="Academic Year" value={note.academicYear} />}
            {note.professor && <MetaItem label="Professor" value={note.professor} />}
          </div>
        </section>

        {/* Description */}
        {note.description && (
          <section className="px-6 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{note.description}</p>
          </section>
        )}

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <section className="px-6 py-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tags</h3>
            <ul className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <li key={tag} className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                  #{tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* File Preview */}
        <section className="px-6 py-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Note Preview</h2>
          <div className="rounded-lg overflow-hidden border border-gray-300">
            <FileViewer fileUrl={note.filePath} />
          </div>
        </section>

        {/* Actions */}
        <section className="px-6 py-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          {userInfo && (
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-2 px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg border border-black shadow transition"
            >
              <FaBookmark /> Save to Favorites
            </button>
          )}

          <a
            href={`${import.meta.env.VITE_BACKEND_URL}${note.filePath}`}
            download={`${note.title.replace(/\s+/g, '_')}.${note.filePath.split('.').pop()}`}
            className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition"
          >
            <FaDownload /> Download Note
          </a>
        </section>

        {/* Review */}
        <section className="px-6 py-6 border-b border-gray-200">
          {!showReviewForm && userInfo && (
            <div className="text-center">
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg border border-black shadow transition"
              >
                Leave a Review
              </button>
            </div>
          )}
          {showReviewForm && userInfo && (
            <LeaveReview
              targetId={note._id}
              reviewType="note"
              onReviewSubmitted={() => {
                setShowReviewForm(false);
                fetchNote();
              }}
            />
          )}
        </section>

        {/* Comments */}
        <section className="px-6 py-6">
          <CommentSection noteId={note._id} />
        </section>
      </div>
    </main>
  );
};

function MetaItem({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 font-medium uppercase tracking-wide text-xs">{label}</p>
      <p className="text-gray-800 font-semibold">{value}</p>
    </div>
  );
}

export default NoteDetailPage;
