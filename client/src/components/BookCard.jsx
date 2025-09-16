

// import React from 'react';
// import { Link } from 'react-router-dom';

// const BookCard = ({ book }) => {

//   function readChar(title) {
//     if (title.length < 18) {
//       return title;
//     } else {
//       return title.substring(0, 18) + "..."
//     }
//   }
//   return (
//     <>

//       <Link
//         to={`/books/${book._id}`}
//         className="text-sm font-semibold text-black mt-2  "
//       >

//         <div
//           className="flex flex-col  bg-purple-100 items-center py-4 transition-all hover:scale-105"
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//         >
//           {/* Cover + Heart Icon */}
//           <div className="relative  mb-2">
//             <img
//               src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
//               alt={book.title}
//               className="w-36 h-52 object-cover mb- rounded shadow-md"
//             />
//           </div>
//         </div>
//         <div className='bg-purple-100 flex flex-col items-center'>
//           {/* Title */}
//           <p>
//             {
//               readChar(book.title)
//             }
//           </p>


//           {/* Author */}
//           <p className="text-xs text-start text-[#48aae6] font-bold mt-1 mb-3">by {readChar(book.author)}</p>

//           {/* Rating */}
//         </div>

//       </Link>
//     </>

//   );

// };

// export default BookCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaBookmark, FaExchangeAlt, FaMoneyBillWave, FaGift, FaUser } from 'react-icons/fa';

const BookCard = ({ book }) => {
  function readChar(title) {
    if (title.length < 18) {
      return title;
    } else {
      return title.substring(0, 18) + "...";
    }
  }

  const getListingTypeColor = (type) => {
    switch (type) {
      case 'Sell':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Exchange':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Free':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getListingTypeIcon = (type) => {
    switch (type) {
      case 'Sell':
        return <FaMoneyBillWave className="w-3 h-3" />;
      case 'Exchange':
        return <FaExchangeAlt className="w-3 h-3" />;
      case 'Free':
        return <FaGift className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'New':
        return 'text-emerald-600';
      case 'Like New':
        return 'text-blue-600';
      case 'Good':
        return 'text-yellow-600';
      case 'Acceptable':
        return 'text-orange-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <Link to={`/books/${book._id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300">
        {/* Image Container */}
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-4">
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
              alt={book.title}
              className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
            />

            {/* Listing Type Badge */}
            {book.listingType && (
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 backdrop-blur-sm ${getListingTypeColor(book.listingType)}`}>
                {getListingTypeIcon(book.listingType)}
                {book.listingType}
              </div>
            )}

            {/* Bookmark Icon */}
            <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
              <FaBookmark className="w-3 h-3 text-slate-600" />
            </button>

            {/* Status Overlay */}
            {book.status && book.status !== 'Available' && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-full text-sm">
                  {book.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
            {readChar(book.title)}
          </h3>

          {/* Author */}
          <p className="text-sm text-slate-600 mb-3 flex items-center">
            <FaUser className="w-3 h-3 mr-1 text-slate-400" />
            by {readChar(book.author)}
          </p>

          {/* Book Details */}
          <div className="space-y-2 mb-4">
            {/* Condition */}
            {book.condition && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Condition:</span>
                <span className={`text-xs font-medium ${getConditionColor(book.condition)}`}>
                  {book.condition}
                </span>
              </div>
            )}

           
          </div>



          {/* Owner/Seller Info */}
          {book.owner && (
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center">
                <img
                  src={book.owner.profilePicture ? `${import.meta.env.VITE_BACKEND_URL}${book.owner.profilePicture}` : '/default-avatar.png'}
                  alt={book.owner.name}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                />
                <span className="text-xs text-slate-600 ml-2">
                  {book.owner.name}
                </span>
                {book.owner.verified && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full ml-1" title="Verified seller"></div>
                )}
              </div>
            </div>
          )}
        </div>

       
      </div>
    </Link>
  );
};

export default BookCard;
