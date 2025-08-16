// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import noteService from '../services/noteService';
// import { toast } from 'react-hot-toast';
// import { FaStar, FaCrown } from 'react-icons/fa';

// // A special, more detailed card for topper notes
// const TopperNoteCard = ({ note }) => (
//   <Link to={`/notes/${note._id}`} className="block">
//     <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col border-2 border-yellow-400 hover:border-[#6e48aa]">
//       <div className="flex justify-between items-center text-yellow-500">
//         <FaCrown />
//         <span className="font-bold text-xs" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>TOPPER NOTE</span>
//         <FaCrown />
//       </div>
//       <div className="flex-grow mt-2">
//         <h3 className="text-lg font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           {note.title}
//         </h3>
//         <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           {note.topperDetails.achievement} ({note.topperDetails.year})
//         </p>
//       </div>
//       <div className="mt-4 pt-2 border-t">
//         <p className="text-sm text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           Uploaded by: <span className="font-bold">{note?.postedBy?.name}</span>
//         </p>
//       </div>
//     </div>
//   </Link>
// );


// const NotesFromTopperPage = () => {
//   const [topperNotes, setTopperNotes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTopperNotes = async () => {
//       try {
//         const data = await noteService.getTopperNotes();
//         setTopperNotes(data);
//       } catch (error) {
//         toast.error("Could not fetch topper notes.", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTopperNotes();
//   }, []);

//   if (loading) return <p className="text-center p-10">Loading notes...</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="text-center mb-10">
//         {/* ... Page Header ... */}
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {topperNotes.length > 0 ? (
//           topperNotes.map((note) => (
//             <TopperNoteCard key={note._id} note={note} />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No topper notes have been featured yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotesFromTopperPage;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noteService from '../services/noteService';
import { toast } from 'react-hot-toast';
import { FaStar, FaCrown, FaTrophy, FaGraduationCap } from 'react-icons/fa';

// A special, more detailed card for topper notes
const TopperNoteCard = ({ note }) => (
  <Link to={`/notes/${note._id}`} className="block group font-comic">
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl p-6 h-full flex flex-col border-l-4 border-yellow-400 transition-all duration-300 transform group-hover:-translate-y-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
          <FaCrown className="text-yellow-500" />
          <span className="font-bold text-xs text-yellow-700 tracking-wide">TOPPER'S NOTE</span>
        </div>
        <div className="text-yellow-500 bg-yellow-100 p-2 rounded-full">
          <FaTrophy size={16} />
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {note.title}
        </h3>
        <div className="flex items-center mb-4">
          <FaGraduationCap className="text-purple-500 mr-2" />
          <span className="text-sm font-medium text-purple-700">
            {note.topperDetails.achievement} ({note.topperDetails.year})
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">
          {note.description || "High-quality notes from top-performing student"}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-2">
            {note?.postedBy?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-xs text-gray-500">Uploaded by</p>
            <p className="text-sm font-medium text-gray-700">{note?.postedBy?.name || "Anonymous"}</p>
          </div>
        </div>
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

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <div className="animate-pulse flex flex-col items-center">
        <FaCrown className="text-yellow-400 text-4xl mb-4" />
        <p className="text-gray-600">Loading premium notes...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-yellow-100 text-yellow-800 rounded-full px-6 py-2 mb-6">
          <FaCrown className="mr-2" />
          <span className="font-medium">Premium Content</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Notes From Top Performers</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access high-quality notes from students who aced their exams. Learn from the best!
        </p>
      </div>

      {topperNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {topperNotes.map((note) => (
            <TopperNoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          <FaCrown className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No featured topper notes yet</h3>
          <p className="text-gray-400">Check back later for premium content</p>
        </div>
      )}
    </div>
  );
};

export default NotesFromTopperPage;