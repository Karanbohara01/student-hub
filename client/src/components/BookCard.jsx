

// import React from 'react';
// import { Link } from 'react-router-dom';
// import StarRating from './StarRating';

// const BookCard = ({ book }) => {
//   // Helper function to get a different color for each listing type
//   const getBadgeStyle = (listingType) => {
//     switch (listingType) {
//       case 'Sell':
//         return 'bg-[#58cc02] text-white'; // purple
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
//         {book.coverImage && book.coverImage !== '/uploads/default-book-cover.png' && (
//           <img
//             src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
//             alt={book.title}
//             className="w-full h-48 object-cover"
//           />
//         )}
//         <div className="p-5 flex-grow flex flex-col">
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
//           <div className="mt-auto pt-4">
//             <p className="text-xs text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//               Condition: <span className="font-bold">{book.condition}</span>
//             </p>
//             <StarRating rating={book.user.rating} numReviews={book.user.numReviews} />

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
  const getBadgeStyle = (listingType) => {
    switch (listingType) {
      case 'Sell':
        return 'bg-[#58cc02] text-white'; // purple
      case 'Exchange':
        return 'bg-[#48aae6] text-white'; // Blue
      case 'Free':
        return 'bg-[#ff4757] text-white'; // Red
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Link to={`/books/${book._id}`} className="block group transform transition-transform duration-300 hover:scale-[1.03]">
      <div
        className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-black hover:border-[#6e48aa] transition-all duration-300 flex flex-col h-full"
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
      >
        {/* Cover Image */}
        {book.coverImage && book.coverImage !== '/uploads/default-book-cover.png' && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
            alt={book.title}
            className="w-full h-52 object-cover"
          />
        )}

        {/* Book Info */}
        <div className="p-5 flex flex-col flex-grow space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-[#6e48aa] leading-tight group-hover:text-[#4e3480] transition-colors">
              {book.title}
            </h3>
            <span
              className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full shadow ${getBadgeStyle(book.listingType)}`}
            >
              {book.listingType}
            </span>
          </div>

          <p className="text-sm text-gray-600 font-semibold">by {book.author}</p>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Condition: <span className="font-bold text-gray-700">{book.condition}</span>
            </p>
            <div className="mt-1">
              <StarRating
                rating={book.user?.rating || 0}
                numReviews={book.user?.numReviews || 0}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
