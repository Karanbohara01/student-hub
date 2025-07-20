// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import bookService from '../services/bookService';
// import BookCard from '../components/BookCard';
// import { toast } from 'react-hot-toast';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5001');

// const BookListPage = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     condition: '',
//     listingType: '',
//   });

//   // This useEffect handles the initial fetch and re-fetching when filters change
//   useEffect(() => {
//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const params = {
//           searchTerm,
//           condition: filters.condition,
//           listingType: filters.listingType,
//         };
//         const data = await bookService.getBookListings(params);
//         setBooks(data);
//       } catch (error) {
//         console.log(error);

//         toast.error('Could not fetch book listings.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, [searchTerm, filters]);

//   // This separate useEffect handles the real-time socket connection
//   useEffect(() => {
//     socket.on('book_status_updated', (updatedBook) => {
//       toast('A book status was just updated!', { icon: '🔄' });
//       setBooks((prevBooks) =>
//         prevBooks.map((book) =>
//           book._id === updatedBook.bookId
//             ? { ...book, status: updatedBook.newStatus }
//             : book
//         )
//       );
//     });

//     // Clean up the listener when the component unmounts
//     return () => {
//       socket.off('book_status_updated');
//     };
//   }, []); // Empty dependency array means this runs only once on mount

//   const handleFilterChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           Find Your Next Book
//         </h1>
//       </div>

//       {/* Search and Filter UI */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-xl border-2 border-black">
//         <input
//           type="text"
//           placeholder="Search by title or author..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full md:flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl"
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//         />
//         <select name="condition" value={filters.condition} onChange={handleFilterChange} className="px-4 py-2 border-2 border-gray-300 rounded-xl bg-white" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           <option value="">All Conditions</option>
//           <option value="New">New</option>
//           <option value="Like New">Like New</option>
//           <option value="Good">Good</option>
//           <option value="Acceptable">Acceptable</option>
//         </select>
//         <select name="listingType" value={filters.listingType} onChange={handleFilterChange} className="px-4 py-2 border-2 border-gray-300 rounded-xl bg-white" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           <option value="">All Types</option>
//           <option value="Sell">Sell</option>
//           <option value="Exchange">Exchange</option>
//           <option value="Free">Free</option>
//         </select>
//       </div>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {books.length > 0 ? (
//             books.map((book) => <BookCard key={book._id} book={book} />)
//           ) : (
//             <p className="col-span-full text-center text-gray-500">No books match your criteria.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookListPage;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../services/bookService';
import BookCard from '../components/BookCard';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';
import { FaSearch, FaBook, FaExchangeAlt, FaMoneyBillWave, FaGift, FaFilter } from 'react-icons/fa';

const socket = io('http://localhost:5001');

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    condition: '',
    listingType: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = {
          searchTerm,
          condition: filters.condition,
          listingType: filters.listingType,
        };
        const data = await bookService.getBookListings(params);
        setBooks(data);
      } catch (error) {
        console.log(error);
        toast.error('Could not fetch book listings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm, filters]);

  useEffect(() => {
    socket.on('book_status_updated', (updatedBook) => {
      toast('A book status was just updated!', {
        icon: '🔄',
        style: {
          background: '#6e48aa',
          color: '#fff',
        }
      });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === updatedBook.bookId
            ? { ...book, status: updatedBook.newStatus }
            : book
        )
      );
    });

    return () => {
      socket.off('book_status_updated');
    };
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      condition: '',
      listingType: '',
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold text-purple-900 mb-4"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
        >
          Discover Your Next <span className="text-[#6e48aa]">Adventure</span>
        </h1>
        <p
          className="text-lg text-purple-700 max-w-2xl mx-auto"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          Find, exchange, or buy textbooks from fellow students
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-12">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-purple-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-12 py-4 border-0 rounded-xl shadow-md text-purple-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700 transition-colors"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                  Book Condition
                </label>
                <div className="relative">
                  <select
                    name="condition"
                    value={filters.condition}
                    onChange={handleFilterChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-lg"
                  >
                    <option value="">All Conditions</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Acceptable">Acceptable</option>
                  </select>
                </div>
              </div>

              {/* Listing Type Filter */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                  Listing Type
                </label>
                <div className="relative">
                  <select
                    name="listingType"
                    value={filters.listingType}
                    onChange={handleFilterChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-lg"
                  >
                    <option value="">All Types</option>
                    <option value="Sell">For Sale</option>
                    <option value="Exchange">For Exchange</option>
                    <option value="Free">Free</option>
                  </select>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilters({ ...filters, listingType: 'Sell' })}
            className={`flex items-center px-4 py-2 rounded-full ${filters.listingType === 'Sell' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700'} shadow-sm hover:shadow-md transition-all`}
          >
            <FaMoneyBillWave className="mr-2" /> For Sale
          </button>
          <button
            onClick={() => setFilters({ ...filters, listingType: 'Exchange' })}
            className={`flex items-center px-4 py-2 rounded-full ${filters.listingType === 'Exchange' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700'} shadow-sm hover:shadow-md transition-all`}
          >
            <FaExchangeAlt className="mr-2" /> Exchange
          </button>
          <button
            onClick={() => setFilters({ ...filters, listingType: 'Free' })}
            className={`flex items-center px-4 py-2 rounded-full ${filters.listingType === 'Free' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700'} shadow-sm hover:shadow-md transition-all`}
          >
            <FaGift className="mr-2" /> Free
          </button>
        </div>
      </div>

      {/* Book Listings */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <FaBook className="mx-auto text-5xl text-purple-300 mb-4" />
                <h3 className="text-xl font-bold text-purple-900 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                  No books found
                </h3>
                <p className="text-purple-600 mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookListPage;