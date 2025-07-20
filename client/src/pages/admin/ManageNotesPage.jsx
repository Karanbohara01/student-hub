import { useState, useEffect } from 'react';
import axios from 'axios'; // We'll need axios for admin routes
import { toast } from 'react-hot-toast';

const ManageNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        // We need to create an adminService later, for now we use axios directly
        const { data } = await axios.get('/api/admin/notes');
        setNotes(data);
      } catch (error) {
        toast.error('Could not fetch notes.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNotes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Notes</h1>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Uploader</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map(note => (
                <tr key={note._id}>
                  <td className="py-2 px-4 border">{note.title}</td>
                  <td className="py-2 px-4 border">{note.postedBy.name}</td>
                  <td className="py-2 px-4 border">{note.status}</td>
                  <td className="py-2 px-4 border">
                    {/* We will add approve/reject/feature buttons here */}
                    <button className="text-blue-500">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageNotesPage;