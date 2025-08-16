import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import { toast } from 'react-hot-toast';

const EditBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    condition: 'Good',
    listingType: 'Sell',
    price: '',
    exchangeDetails: '',
  });
  const [loading, setLoading] = useState(true);
  const { id: bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getBookById(bookId);
        setFormData({
          title: data.title,
          author: data.author,
          condition: data.condition,
          listingType: data.listingType,
          price: data.price || '',
          exchangeDetails: data.exchangeDetails || '',
        });
      } catch (error) {
        console.log(error);

        toast.error('Could not fetch book data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await bookService.updateBookListing(bookId, formData);
      toast.success('Book listing updated!');
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.log(error);

      toast.error('Failed to update listing.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await bookService.deleteBookListing(bookId);
        toast.success('Listing deleted!');
        navigate('/books');
      } catch (error) {
        console.log(error);

        toast.error('Failed to delete listing.');
      }
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen   p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg border-4 border-purple-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Edit Book Listing</h1>
          <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto mt-2"></div>
        </div>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Form Inputs */}
          <input id="title" type="text" placeholder="Book Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
          <input id="author" type="text" placeholder="Author" value={formData.author} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Condition</label>
            <select id="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
              <option>Good</option>
              <option>New</option>
              <option>Like New</option>
              <option>Acceptable</option>
            </select>
          </div>
          <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-[#48aae6] rounded-md hover:bg-[#3a8cc4] shadow-md border-2 border-purple-700">SAVE CHANGES</button>
        </form>
        <div className="mt-6 border-t-2 border-gray-200 pt-6">
          <button onClick={handleDelete} className="w-full px-4 py-3 font-bold text-white bg-[#ff4757] rounded-md hover:bg-[#e03f4f] shadow-md border-2 border-purple-700">DELETE LISTING</button>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;