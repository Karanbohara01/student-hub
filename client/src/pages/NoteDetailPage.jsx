

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import noteService from '../services/noteService';
import { toast } from 'react-hot-toast';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import LeaveReview from '../components/LeaveReview';
import { useCallback } from 'react';
import useAuthStore from '../store/authStore';
import { FaBookmark } from 'react-icons/fa';
import authService from '../services/authService.js';
import FileViewer from '../components/FileViewer';
import CommentSection from '../components/CommentSection.jsx';


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: noteId } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { userInfo } = useAuthStore();


  const fetchNote = useCallback(async () => {
    try {
      const data = await noteService.getNoteById(noteId);
      setNote(data);
    } catch (error) {
      toast.error('Could not fetch note details.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  if (loading) return (
    <div className="text-center p-10" aria-live="polite" aria-busy="true">
      Loading note...
    </div>
  );

  if (!note) return (
    <div className="text-center p-10" aria-live="polite">
      <p>Note not found.</p>
      <Link
        to="/notes"
        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#6e48aa] text-white rounded-lg"
        aria-label="Return to notes library"
      >
        <FaArrowLeft /> Back to Notes
      </Link>
    </div>
  );

  const handleSaveNote = async () => {
    try {
      await authService.addNoteToFavorites(note._id);
      toast.success('Note saved to your favorites!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save note.');
    }
  };

  return (
    <main className="flex justify-center min-h-screen bg-[#6e48aa] p-4">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
        {/* Back Navigation */}
        <nav aria-label="Breadcrumb">
          <Link
            to="/notes"
            className="inline-flex items-center gap-1 text-[#6e48aa] hover:underline"
            aria-label="Return to notes library"
          >
            <FaArrowLeft /> All Notes
          </Link>
        </nav>

        {/* Header Section */}
        <header className="text-center border-b-2 border-gray-200 pb-4">
          <h1
            className="text-3xl font-bold text-[#6e48aa] mt-2"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            id="note-title"
          >
            {note.title}
          </h1>
          <p
            className="text-sm text-gray-500 mt-1"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            aria-label={`Uploaded by ${note.postedBy?.name || 'Admin'}`}
          >
            Uploaded by {note.postedBy?.name || 'Admin'}
          </p>

          {/* --- RATING DISPLAY --- */}
          <div className="flex justify-center mt-2">
            <StarRating rating={note.rating} numReviews={note.numReviews} />
          </div>
        </header>

        {/* Metadata Section */}
        <section aria-labelledby="note-metadata-heading">
          <h2 id="note-metadata-heading" className="sr-only">Note Details</h2>

          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-b-2 border-gray-200"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            <div>
              <p className="text-sm font-bold text-gray-500">UNIVERSITY</p>
              <p className="text-lg font-bold text-[#6e48aa]" aria-label={`University: ${note.university}`}>
                {note.university}
              </p>
            </div>

            {note.faculty && (
              <div>
                <p className="text-sm font-bold text-gray-500">FACULTY</p>
                <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Faculty: ${note.faculty}`}>
                  {note.faculty}
                </p>
              </div>
            )}

            {/* Program - Added this section */}
            {note.program && (
              <div>
                <p className="text-sm font-bold text-gray-500">PROGRAM</p>
                <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Program: ${note.program}`}>
                  {note.program}
                </p>
              </div>
            )}

            {note.program && (
              <div>
                <p className="text-sm font-bold text-gray-500">PROGRAM</p>
                <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Program: ${note.program}`}>
                  {note.program}
                </p>
              </div>
            )}

            {note.semester && (
              <div>
                <p className="text-sm font-bold text-gray-500">SEMESTER/YEAR</p>
                <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Semester: ${note.semester}`}>
                  {note.semester}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm font-bold text-gray-500">SUBJECT</p>
              <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Subject: ${note.subject}`}>
                {note.subject}
              </p>
            </div>

            {note.courseCode && (
              <div>
                <p className="text-sm font-bold text-gray-500">COURSE CODE</p>
                <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Course code: ${note.courseCode}`}>
                  {note.courseCode}
                </p>
              </div>
            )}

            {note.academicYear && (
              <div>
                <p className="text-sm font-bold text-gray-500">ACADEMIC YEAR</p>
                <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Academic year: ${note.academicYear}`}>
                  {note.academicYear}
                </p>
              </div>
            )}

            {note.professor && (
              <div>
                <p className="text-sm font-bold text-gray-500">PROFESSOR</p>
                <p className="text-lg font-bold text-[#6e48aa]" aria-label={`Professor: ${note.professor}`}>
                  {note.professor}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Description Section */}
        {note.description && (
          <section aria-labelledby="note-description-heading">
            <h2
              id="note-description-heading"
              className="text-2xl font-bold text-[#6e48aa] mb-2"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
              Description
            </h2>
            <div className="prose max-w-none">
              <p style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                {note.description}
              </p>
            </div>
          </section>
        )}

        {/* Tags Section */}
        {note.tags && note.tags.length > 0 && (
          <section aria-labelledby="note-tags-heading">
            <h3
              id="note-tags-heading"
              className="text-lg font-bold text-gray-700 mb-2"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
              Tags
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label="Note tags">
              {note.tags.map(tag => (
                <li key={tag}>
                  <span
                    className=" text-purple-800 text-sm font-bold   py-1  "
                    aria-label={`Tag: ${tag}`}
                  >
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="my-6">
          <h2 className="text-2xl font-bold text-[#6e48aa] mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            Note Preview
          </h2>
          <FileViewer fileUrl={note.filePath} />
        </section>

        {/* Download Section */}


        <section className="text-center flex justify-between gap-10 pt-6 border-t-2 border-gray-200 mt-6">
          {userInfo && (
            <button
              onClick={handleSaveNote}
              className="inline-flex items-center gap-2 px-8 py-3   bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 shadow-md border-2 border-black"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
              <FaBookmark />
              SAVE TO FAVORITES
            </button>
          )}
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}${note.filePath}`}
            download={`${note.title.replace(/\s+/g, '_')}.${note.filePath.split('.').pop()}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#58cc02] text-white font-bold rounded-xl hover:bg-[#46a302] shadow-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#58cc02] focus:ring-offset-2"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            aria-label={`Download note: ${note.title}`}
          >
            <FaDownload aria-hidden="true" />
            DOWNLOAD NOTE
          </a>
          {note.fileSize && (
            <p
              className="text-sm text-gray-500 mt-2"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              aria-label={`File size: ${note.fileSize}`}
            >
              File size: {note.fileSize}
            </p>
          )}
          {note.fileType && (
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              aria-label={`File type: ${note.fileType}`}
            >
              File type: {note.fileType.toUpperCase()}
            </p>
          )}
        </section>
        {/* --- REVIEW SECTION --- */}
        <section className="pt-6 border-t-2 border-gray-200 mt-6">
          {!showReviewForm && userInfo && (
            <div className="text-center">
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 shadow-md border-2 border-black"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
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
                fetchNote(); // refresh rating and review count
              }}
            />


          )}
        </section>
        <CommentSection noteId={note._id} />


      </div>
    </main>
  );
};

export default NoteDetailPage;