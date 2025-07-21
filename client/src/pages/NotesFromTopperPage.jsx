import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noteService from '../services/noteService';
import { toast } from 'react-hot-toast';
import { FaStar, FaCrown } from 'react-icons/fa';

// A special, more detailed card for topper notes
const TopperNoteCard = ({ note }) => (
  <Link to={`/notes/${note._id}`} className="block">
    <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col border-2 border-yellow-400 hover:border-[#6e48aa]">
      <div className="flex justify-between items-center text-yellow-500">
        <FaCrown />
        <span className="font-bold text-xs" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>TOPPER NOTE</span>
        <FaCrown />
      </div>
      <div className="flex-grow mt-2">
        <h3 className="text-lg font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          {note.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          {note.topperDetails.achievement} ({note.topperDetails.year})
        </p>
      </div>
      <div className="mt-4 pt-2 border-t">
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          Uploaded by: <span className="font-bold">{note?.postedBy?.name}</span>
        </p>
      </div>
    </div>
  </Link>
);


const NotesFromTopperPage = () => {
  const [topperNotes, setTopperNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopperNotes = async () => {
      try {
        const data = await noteService.getTopperNotes();
        setTopperNotes(data);
      } catch (error) {
        toast.error("Could not fetch topper notes.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopperNotes();
  }, []);

  if (loading) return <p className="text-center p-10">Loading notes...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        {/* ... Page Header ... */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topperNotes.length > 0 ? (
          topperNotes.map((note) => (
            <TopperNoteCard key={note._id} note={note} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No topper notes have been featured yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotesFromTopperPage;