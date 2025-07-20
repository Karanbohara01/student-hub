// import React from 'react';
// import { Link } from 'react-router-dom';

// const BookCard = ({ book }) => {
//   // Helper function to get a different color for each listing type
//   const getBadgeStyle = (listingType) => {
//     switch (listingType) {
//       case 'Sell':
//         return 'bg-[#58cc02] text-white'; // Green
//       case 'Exchange':
//         return 'bg-[#48aae6] text-white'; // Blue
//       case 'Free':
//         return 'bg-[#ff4757] text-white'; // Red
//       default:
//         return 'bg-gray-200 text-gray-800';
//     }
//   };

//   return (
//     <Link to={`/books/${book._id}`} className="block">
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-2 border-black hover:border-[#6e48aa] hover:scale-[1.02] flex flex-col">
//         <img
//           src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
//           alt={book.title}
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-5 flex-grow">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-lg font-bold text-[#6e48aa] leading-tight" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//               {book.title}
//             </h3>
//             <span className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeStyle(book.listingType)}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//               {book.listingType}
//             </span>
//           </div>
//           <p className="text-sm text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             by {book.author}
//           </p>
//         </div>
//         <div className="px-5 pb-5 mt-auto">
//           <p className="text-xs text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             Condition: <span className="font-bold">{book.condition}</span>
//           </p>
//           <div className="mt-2 text-md font-bold text-gray-800" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             {book.listingType === 'Sell' && `Rs. ${book.price}`}
//             {book.listingType === 'Exchange' && <p className="truncate">Wants: {book.exchangeDetails}</p>}
//             {book.listingType === 'Free' && 'FREE'}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default BookCard;

import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const BookCard = ({ book }) => {
  // Helper function to get a different color for each listing type
  const getBadgeStyle = (listingType) => {
    switch (listingType) {
      case 'Sell':
        return 'bg-[#58cc02] text-white'; // Green
      case 'Exchange':
        return 'bg-[#48aae6] text-white'; // Blue
      case 'Free':
        return 'bg-[#ff4757] text-white'; // Red
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Link to={`/books/${book._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-2 border-black hover:border-[#6e48aa] hover:scale-[1.02] flex flex-col">
        {book.coverImage && book.coverImage !== '/uploads/default-book-cover.png' && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-[#6e48aa] leading-tight" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
              {book.title}
            </h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeStyle(book.listingType)}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
              {book.listingType}
            </span>
          </div>
          <p className="text-sm text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            by {book.author}
          </p>
          <div className="mt-auto pt-4">
            <p className="text-xs text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
              Condition: <span className="font-bold">{book.condition}</span>
            </p>
            <StarRating rating={book.user.rating} numReviews={book.user.numReviews} />

          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;