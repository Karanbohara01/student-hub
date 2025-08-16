

import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {

  function readChar(title) {
    if (title.length < 18) {
      return title;
    } else {
      return title.substring(0, 18) + "..."
    }
  }
  return (
    <>

      <Link
        to={`/books/${book._id}`}
        className="text-sm font-semibold text-black mt-2 "
      >

        <div
          className="flex flex-col  bg-purple-100 items-center py-4 transition-all hover:scale-105"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          {/* Cover + Heart Icon */}
          <div className="relative  mb-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
              alt={book.title}
              className="w-36 h-52 object-cover mb- rounded shadow-md"
            />
          </div>
        </div>
        <div className='bg-purple-100 flex flex-col items-center'>
          {/* Title */}
          <p>
            {
              readChar(book.title)
            }
          </p>


          {/* Author */}
          <p className="text-xs text-start text-[#48aae6] font-bold mt-1">by {readChar(book.author)}</p>

          {/* Rating */}
        </div>

      </Link>
    </>

  );

};

export default BookCard;
