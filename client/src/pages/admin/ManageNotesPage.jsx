import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService'; // <-- This was the missing import

const FeatureNoteModal = ({ note, onClose, onFeatured }) => {
  const [details, setDetails] = useState({
    year: '',
    achievement: '',
    rank: ''
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.featureNote(note._id, details);
      toast.success('Note featured successfully!');
      onFeatured();
      onClose();
    } catch (error) {
      toast.error('Failed to feature note.', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-black w-full max-w-lg" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
        <h2 className="text-2xl font-bold text-[#6e48aa] mb-4">Feature Note: {note.title}</h2>
        <div className="flex items-center p-4 mb-4 bg-gray-100 rounded-xl border-2 border-black">
          <img src={note.postedBy.profilePicture} alt={note.postedBy.name} className="w-12 h-12 rounded-full border-2 border-black" />
          <div className="ml-4">
            <p className="font-bold text-lg">{note.postedBy.name}</p>
            <p className="text-sm text-gray-600">{note.university}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="year" placeholder="Year (e.g., 2025)" onChange={handleChange} required className="w-full p-2 border-2 border-gray-300 rounded-xl" />
          <input name="achievement" placeholder="Achievement (e.g., Board Topper)" onChange={handleChange} required className="w-full p-2 border-2 border-gray-300 rounded-xl" />
          <input name="rank" placeholder="Rank (e.g., 1st)" onChange={handleChange} required className="w-full p-2 border-2 border-gray-300 rounded-xl" />
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 font-bold rounded-xl border-2 border-black">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#6e48aa] text-white font-bold rounded-xl border-2 border-black">Approve & Feature</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const ManageNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchAllNotes = useCallback(async () => {
    try {
      const data = await adminService.getAllNotes();
      setNotes(data);
    } catch (error) {
      toast.error('Could not fetch notes.', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  const handleUpdateStatus = async (noteId, status) => {
    try {
      await adminService.updateNoteStatus(noteId, status);
      toast.success(`Note ${status.toLowerCase()}!`);
      fetchAllNotes(); // Refresh the list
    } catch (error) {
      toast.error('Failed to update status.', error);
    }
  };

  return (
    <div style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <h1 className="text-3xl font-bold text-[#6e48aa] mb-4">Manage Notes</h1>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto bg-white p-4 rounded-2xl border-4 border-black">
          <table className="min-w-full">
            <thead className="border-b-4 border-black">
              <tr>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Uploader</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map(note => (
                <tr key={note._id} className="text-center border-b">
                  <td className="py-2 px-4 font-bold"><Link to={`/notes/${note._id}`} className="text-blue-500 hover:underline">{note.title}</Link></td>
                  <td className="py-2 px-4">{note.postedBy?.name || 'N/A'}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${note.status === 'Approved' ? 'bg-purple-200 text-purple-800' :
                      note.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'
                      }`}>
                      {note.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    {note.status === 'Pending' && (
                      <>
                        <button onClick={() => handleUpdateStatus(note._id, 'Approved')} className="px-3 py-1 bg-purple-500 text-white font-bold rounded-lg text-sm">Approve</button>
                        <button onClick={() => handleUpdateStatus(note._id, 'Rejected')} className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg text-sm">Reject</button>
                      </>
                    )}
                    {note.status === 'Approved' && !note.isTopperNote && (
                      <button onClick={() => setSelectedNote(note)} className="px-3 py-1 bg-yellow-500 text-white font-bold rounded-lg text-sm">Feature</button>
                    )}
                    {note.isTopperNote && <span className="text-yellow-500 font-bold">Featured ✨</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedNote && <FeatureNoteModal note={selectedNote} onClose={() => setSelectedNote(null)} onFeatured={fetchAllNotes} />}
    </div>
  );
};

export default ManageNotesPage;