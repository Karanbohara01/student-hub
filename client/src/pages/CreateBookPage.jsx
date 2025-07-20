// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import bookService from '../services/bookService';
// import { toast } from 'react-hot-toast';

// const CreateBookPage = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     isbn: '',
//     condition: 'Good',
//     listingType: 'Sell',
//     price: '',
//     exchangeDetails: '',
//   });
//   const [coverImage, setCoverImage] = useState(null); // <-- Add state for the image file


//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach(key => data.append(key, formData[key]));

//     if (coverImage) {
//       data.append('coverImage', coverImage);
//     }
//     try {
//       await bookService.createBookListing(data);
//       toast.success('Book listed successfully!');
//       navigate('/books');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to list book.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#6e48aa] p-4">
//       <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>List a New Book</h1>
//           <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto mt-2"></div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input id="title" type="text" placeholder="Book Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//           <input id="author" type="text" placeholder="Author" value={formData.author} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//           <input id="isbn" type="text" placeholder="ISBN (Optional)" value={formData.isbn} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Condition</label>
//               <select id="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//                 <option>Good</option>
//                 <option>New</option>
//                 <option>Like New</option>
//                 <option>Acceptable</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Listing Type</label>
//               <select id="listingType" value={formData.listingType} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//                 <option>Sell</option>
//                 <option>Exchange</option>
//                 <option>Free</option>
//               </select>
//             </div>
//           </div>

//           {formData.listingType === 'Sell' && (
//             <input id="price" type="number" placeholder="Price (Rs.)" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//           )}

//           {formData.listingType === 'Exchange' && (
//             <textarea id="exchangeDetails" placeholder="What do you want to exchange for?" value={formData.exchangeDetails} onChange={handleChange} rows="3" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Cover Image</label>
//             <input
//               type="file"
//               name="coverImage" // This name must match the backend
//               onChange={(e) => setCoverImage(e.target.files[0])}
//               className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-[#6e48aa] file:font-bold file:bg-purple-50 file:text-[#6e48aa]"
//               style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             />
//           </div>

//           <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a] shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             LIST MY BOOK
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateBookPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import { toast } from 'react-hot-toast';

const CreateBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    condition: 'Good',
    listingType: 'Sell',
    price: '',
    exchangeDetails: '',
  });
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (coverImage) {
      data.append('coverImage', coverImage);
    }

    try {
      await bookService.createBookListing(data);
      toast.success('Book listed successfully!');
      navigate('/books');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to list book.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#6e48aa] p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>List a New Book</h1>
          <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto mt-2"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input id="title" type="text" placeholder="Book Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
          <input id="author" type="text" placeholder="Author" value={formData.author} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
          <input id="isbn" type="text" placeholder="ISBN (Optional)" value={formData.isbn} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Condition</label>
              <select id="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                <option>Good</option>
                <option>New</option>
                <option>Like New</option>
                <option>Acceptable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Listing Type</label>
              <select id="listingType" value={formData.listingType} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                <option>Sell</option>
                <option>Exchange</option>
                <option>Free</option>
              </select>
            </div>
          </div>

          {formData.listingType === 'Sell' && (
            <input id="price" type="number" placeholder="Price (Rs.)" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
          )}

          {formData.listingType === 'Exchange' && (
            <textarea id="exchangeDetails" placeholder="What do you want to exchange for?" value={formData.exchangeDetails} onChange={handleChange} rows="3" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Cover Image</label>
            <input type="file" name="coverImage" onChange={(e) => setCoverImage(e.target.files[0])} className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-[#6e48aa] file:font-bold file:bg-purple-50 file:text-[#6e48aa]" />
          </div>

          <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a] shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            LIST MY BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookPage;