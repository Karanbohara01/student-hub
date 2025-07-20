// import { useState, useEffect, useCallback } from 'react'; // <-- Import useCallback
// import bookService from '../services/bookService';
// import { toast } from 'react-hot-toast';
// import { Link } from 'react-router-dom';

// // This is a special card just for the management page
// const MyBookListingCard = ({ book, onStatusChange }) => {
//   const handleStatusUpdate = async (newStatus) => {
//     if (window.confirm(`Are you sure you want to mark this book as ${newStatus}?`)) {
//       try {
//         await bookService.updateListingStatus(book._id, newStatus);
//         toast.success(`Listing marked as ${newStatus}!`);
//         onStatusChange(); // Refresh the list
//       } catch (error) {
//         console.log(error);

//         toast.error('Failed to update status.');
//       }
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border-2 border-black p-4 flex flex-col">
//       <h3 className="font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>{book.title}</h3>
//       <p className="text-sm text-gray-500">Status: <span className="font-bold">{book.status}</span></p>
//       <div className="mt-auto pt-4 flex gap-2">
//         <Link to={`/books/${book._id}/edit`} className="flex-1 text-center text-xs px-2 py-2 bg-[#48aae6] text-white font-bold rounded-xl hover:bg-[#3a8cc4] border-2 border-black">EDIT</Link>
//         {book.status === 'Available' && (
//           <button onClick={() => handleStatusUpdate('Sold')} className="flex-1 text-xs px-2 py-2 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 border-2 border-black">MARK SOLD</button>
//         )}
//         {book.status === 'Sold' && (
//           <button onClick={() => handleStatusUpdate('Available')} className="flex-1 text-xs px-2 py-2 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 border-2 border-black">MARK AVAILABLE</button>
//         )}
//       </div>
//     </div>
//   );
// };


// const MyListingsPage = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Moved fetchMyListings out and wrapped in useCallback for stability
//   const fetchMyListings = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await bookService.getMyBookListings();
//       setBooks(data);
//     } catch (error) {
//       console.log(error);

//       toast.error('Could not fetch your listings.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMyListings();
//   }, [fetchMyListings]);

//   if (loading) {
//     return <p className="text-center p-10">Loading your listings...</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           My Book Listings
//         </h1>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {books.length > 0 ? (
//           // Only render the MyBookListingCard
//           books.map((book) => (
//             <MyBookListingCard key={book._id} book={book} onStatusChange={fetchMyListings} />
//           ))
//         ) : (
//           <div className="col-span-full text-center p-10 bg-white rounded-2xl border-2 border-black">
//             <p className="text-xl text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//               You haven't listed any books yet.
//             </p>
//             <Link
//               to="/books/create"
//               className="mt-4 inline-block px-6 py-2 bg-[#48aae6] text-white font-bold rounded-xl hover:bg-[#3a8cc4] shadow-md border-2 border-black"
//               style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             >
//               List Your First Book
//             </Link>
//           </div>


//         )}

//         <Link
//           to="/books/create"
//           className=""
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//         >
//           List Your  Book
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default MyListingsPage;

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import bookService from '../services/bookService';

const MyBookListingCard = ({ book, onStatusChange }) => {
  const handleStatusUpdate = async (newStatus) => {
    if (window.confirm(`Are you sure you want to mark this book as ${newStatus}?`)) {
      try {
        await bookService.updateListingStatus(book._id, newStatus);
        toast.success(`Listing marked as ${newStatus}!`);
        onStatusChange();
      } catch (error) {
        toast.error('Failed to update status.', error);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-2xl shadow-md border-2 border-black p-5 flex flex-col"
    >
      <h3 className="text-lg font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        {book.title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Status: <span className="font-semibold">{book.status}</span>
      </p>

      <div className="mt-auto pt-4 flex flex-col gap-2">
        <Link
          to={`/books/${book._id}/edit`}
          className="text-xs px-4 py-2 bg-[#48aae6] text-white font-bold rounded-xl hover:bg-[#3a8cc4] border-2 border-black text-center"
        >
          ✏️ Edit
        </Link>

        {book.status === 'Available' ? (
          <button
            onClick={() => handleStatusUpdate('Sold')}
            className="text-xs px-4 py-2 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 border-2 border-black"
          >
            ✅ Mark as Sold
          </button>
        ) : (
          <button
            onClick={() => handleStatusUpdate('Available')}
            className="text-xs px-4 py-2 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 border-2 border-black"
          >
            🔁 Mark as Available
          </button>
        )}
      </div>
    </motion.div>
  );
};

const MyListingsPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyListings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await bookService.getMyBookListings();
      setBooks(data);
    } catch (error) {
      toast.error('Could not fetch your listings.', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyListings();
  }, [fetchMyListings]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          📚 My Book Listings
        </h1>
        <p className="text-gray-500 mt-2">Manage all your books from here!</p>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading your listings...</p>
      ) : books.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {books.map((book) => (
            <MyBookListingCard key={book._id} book={book} onStatusChange={fetchMyListings} />
          ))}

          {/* Add new listing CTA at end */}
          <Link
            to="/books/create"
            className="border-2 border-dashed border-[#48aae6] rounded-2xl flex flex-col justify-center items-center p-6 text-[#48aae6] font-bold hover:bg-[#f0faff] transition-colors"
          >
            <span className="text-4xl">➕</span>
            <span style={{ fontFamily: "'Comic Sans MS', cursive" }}>List New Book</span>
          </Link>
        </motion.div>
      ) : (
        <div className="text-center bg-white rounded-2xl border-2 border-black p-10">
          <p className="text-xl text-gray-600 mb-4" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            You haven’t listed any books yet.
          </p>
          <Link
            to="/books/create"
            className="inline-block px-6 py-3 bg-[#48aae6] text-white font-bold rounded-xl hover:bg-[#3a8cc4] border-2 border-black"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            🚀 List Your First Book
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;
