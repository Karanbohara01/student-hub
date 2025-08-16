

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
//   const [coverImage, setCoverImage] = useState(null);

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
//     <div className="flex justify-center items-center min-h-screen  p-4">
//       <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-purple-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>List a New Book</h1>
//           <div className="w-16 h-2 bg-purple-500 rounded-full mx-auto mt-2"></div>
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
//             <input type="file" name="coverImage" onChange={(e) => setCoverImage(e.target.files[0])} className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-[#6e48aa] file:font-bold file:bg-purple-50 file:text-[#6e48aa]" />
//           </div>

//           <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-purple-500 rounded-xl hover:bg-purple-700 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             LIST MY BOOK
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateBookPage;

import { useState, useCallback } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCoverImage(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-2xl border-4 border-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>List a New Book</h1>
          <div className="w-16 h-2 bg-purple-500 rounded-full mx-auto mt-2 mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            Share your book with the community!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              id="title"
              type="text"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            />
            <input
              id="author"
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            />
            <input
              id="isbn"
              type="text"
              placeholder="ISBN (Optional)"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Condition</label>
              <select
                id="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                <option>Good</option>
                <option>New</option>
                <option>Like New</option>
                <option>Acceptable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Listing Type</label>
              <select
                id="listingType"
                value={formData.listingType}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                <option>Sell</option>
                <option>Exchange</option>
                <option>Free</option>
              </select>
            </div>
          </div>

          {formData.listingType === 'Sell' && (
            <input
              id="price"
              type="number"
              placeholder="Price (Rs.)"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            />
          )}

          {formData.listingType === 'Exchange' && (
            <textarea
              id="exchangeDetails"
              placeholder="What do you want to exchange for?"
              value={formData.exchangeDetails}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Cover Image</label>

            <div
              className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-all ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {coverImage ? (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Preview"
                    className="h-32 w-auto object-contain mb-3 rounded-lg border border-gray-200"
                  />
                  <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    {coverImage.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setCoverImage(null)}
                    className="text-sm text-purple-600 hover:text-purple-800"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                      Drag & drop your book cover here, or click to browse
                    </p>
                    <input
                      type="file"
                      name="coverImage"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileInput"
                      accept="image/*"
                    />
                    <label
                      htmlFor="fileInput"
                      className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-200 transition-colors"
                      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                    >
                      Select Image
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white bg-purple-500 rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-black"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            LIST MY BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookPage;