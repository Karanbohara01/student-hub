


// import { useState, useEffect } from 'react';
// import bookService from '../services/bookService';
// import BookCard from '../components/BookCard';
// import { toast } from 'react-hot-toast';
// import io from 'socket.io-client';
// import { FaSearch, FaBook, FaExchangeAlt, FaMoneyBillWave, FaGift, FaFilter } from 'react-icons/fa';

// const socket = io('http://localhost:5001');

// const BookListPage = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     condition: '',
//     listingType: '',
//   });
//   const [showFilters, setShowFilters] = useState(false);

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

//   useEffect(() => {
//     socket.on('book_status_updated', (updatedBook) => {
//       toast('A book status was just updated!', {
//         icon: '🔄',
//         style: {
//           background: '#6e48aa',
//           color: '#fff',
//         }
//       });
//       setBooks((prevBooks) =>
//         prevBooks.map((book) =>
//           book._id === updatedBook.bookId
//             ? { ...book, status: updatedBook.newStatus }
//             : book
//         )
//       );
//     });

//     return () => {
//       socket.off('book_status_updated');
//     };
//   }, []);

//   const handleFilterChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const resetFilters = () => {
//     setFilters({
//       condition: '',
//       listingType: '',
//     });
//     setSearchTerm('');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       {/* Hero Section */}
//       <div className="text-center mb-12">
//         <h1
//           className="text-4xl md:text-5xl font-bold text-purple-900 mb-4"
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
//         >
//           Discover Your Next <span className="text-[#6e48aa]">Adventure</span>
//         </h1>
//         <p
//           className="text-lg text-purple-700 max-w-2xl mx-auto"
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//         >
//           Find, exchange, or buy textbooks from fellow students
//         </p>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="max-w-6xl mx-auto mb-12">
//         {/* Search Bar */}
//         <div className="relative mb-6">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FaSearch className="text-purple-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by title, author, or ISBN..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block w-full pl-10 pr-12 py-4 border-0 rounded-xl shadow-md text-purple-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//           />
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="absolute right-2 top-1/2 transform -tranpurple-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700 transition-colors"
//             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//           >
//             <FaFilter className="mr-2" /> Filters
//           </button>
//         </div>

//         {/* Filter Panel */}
//         {showFilters && (
//           <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-purple-200">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Condition Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-purple-700 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//                   Book Condition
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="condition"
//                     value={filters.condition}
//                     onChange={handleFilterChange}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-lg"
//                   >
//                     <option value="">All Conditions</option>
//                     <option value="New">New</option>
//                     <option value="Like New">Like New</option>
//                     <option value="Good">Good</option>
//                     <option value="Acceptable">Acceptable</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Listing Type Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-purple-700 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//                   Listing Type
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="listingType"
//                     value={filters.listingType}
//                     onChange={handleFilterChange}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-lg"
//                   >
//                     <option value="">All Types</option>
//                     <option value="Sell">For Sale</option>
//                     <option value="Exchange">For Exchange</option>
//                     <option value="Free">Free</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Reset Button */}
//               <div className="flex items-end">
//                 <button
//                   onClick={resetFilters}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                   style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Quick Filter Chips */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           <button
//             onClick={() => setFilters({ ...filters, listingType: 'Sell' })}
//             className={`flex items-center px-4 py-2 rounded-full ${filters.listingType === 'Sell' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700'} shadow-sm hover:shadow-md transition-all`}
//           >
//             <FaMoneyBillWave className="mr-2" /> For Sale
//           </button>
//           <button
//             onClick={() => setFilters({ ...filters, listingType: 'Exchange' })}
//             className={`flex items-center px-4 py-2 rounded-full ${filters.listingType === 'Exchange' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700'} shadow-sm hover:shadow-md transition-all`}
//           >
//             <FaExchangeAlt className="mr-2" /> Exchange
//           </button>
//           <button
//             onClick={() => setFilters({ ...filters, listingType: 'Free' })}
//             className={`flex items-center px-4 py-2 rounded-full ${filters.listingType === 'Free' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700'} shadow-sm hover:shadow-md transition-all`}
//           >
//             <FaGift className="mr-2" /> Free
//           </button>
//         </div>
//       </div>

//       {/* Book Listings */}
//       <div className="max-w-6xl mx-auto">
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//           </div>
//         ) : (
//           <>
//             {books.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                 {books.map((book) => (
//                   <BookCard key={book._id} book={book} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12 bg-white rounded-xl shadow-sm">
//                 <FaBook className="mx-auto text-5xl text-purple-300 mb-4" />
//                 <h3 className="text-xl font-bold text-purple-900 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//                   No books found
//                 </h3>
//                 <p className="text-purple-600 mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//                   Try adjusting your search or filters
//                 </p>
//                 <button
//                   onClick={resetFilters}
//                   className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                   style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookListPage;
import { useState, useEffect } from 'react';
import bookService from '../services/bookService';
import BookCard from '../components/BookCard';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';
import { FaSearch, FaBook, FaExchangeAlt, FaMoneyBillWave, FaGift, FaFilter, FaTimes, FaBookOpen, FaUsers, FaShoppingCart } from 'react-icons/fa';

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
          background: '#1f2937',
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

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.condition) count++;
    if (filters.listingType) count++;
    if (searchTerm) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-gray-800 to-purple-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <FaBookOpen className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Student Book
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                Marketplace
              </span>
            </h1>
            <p className="text-xl text-purple-300 max-w-3xl mx-auto leading-relaxed">
              Buy, sell, and exchange textbooks with fellow students. Find the best deals on academic books and save money on your education.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaBook className="text-purple-400 mr-2" />
                  <span className="text-2xl font-bold">{books.length}+</span>
                </div>
                <p className="text-purple-400 text-sm">Books Available</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaUsers className="text-emerald-400 mr-2" />
                  <span className="text-2xl font-bold">1000+</span>
                </div>
                <p className="text-purple-400 text-sm">Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaShoppingCart className="text-yellow-400 mr-2" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-purple-400 text-sm">Successful Trades</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-purple-200">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-purple-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title, author, ISBN, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-32 py-4 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-2 top-1/2 transform -tranpurple-y-1/2 px-4 py-2 rounded-lg flex items-center transition-all ${showFilters ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
            >
              <FaFilter className="mr-2" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setFilters({ ...filters, listingType: 'Sell' })}
              className={`flex items-center px-4 py-2 rounded-full transition-all ${filters.listingType === 'Sell'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
            >
              <FaMoneyBillWave className="mr-2" />
              For Sale
            </button>
            <button
              onClick={() => setFilters({ ...filters, listingType: 'Exchange' })}
              className={`flex items-center px-4 py-2 rounded-full transition-all ${filters.listingType === 'Exchange'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
            >
              <FaExchangeAlt className="mr-2" />
              Exchange
            </button>
            <button
              onClick={() => setFilters({ ...filters, listingType: 'Free' })}
              className={`flex items-center px-4 py-2 rounded-full transition-all ${filters.listingType === 'Free'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
            >
              <FaGift className="mr-2" />
              Free
            </button>
            {(searchTerm || filters.condition || filters.listingType) && (
              <button
                onClick={resetFilters}
                className="flex items-center px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all"
              >
                <FaTimes className="mr-2" />
                Clear All
              </button>
            )}
          </div>

          {/* Advanced Filter Panel */}
          {showFilters && (
            <div className="border-t border-purple-200 pt-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Book Condition
                  </label>
                  <select
                    name="condition"
                    value={filters.condition}
                    onChange={handleFilterChange}
                    className="block w-full px-3 py-2 border border-purple-300 rounded-lg text-purple-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Conditions</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Acceptable">Acceptable</option>
                  </select>
                </div>

                {/* Listing Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Listing Type
                  </label>
                  <select
                    name="listingType"
                    value={filters.listingType}
                    onChange={handleFilterChange}
                    className="block w-full px-3 py-2 border border-purple-300 rounded-lg text-purple-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="Sell">For Sale</option>
                    <option value="Exchange">For Exchange</option>
                    <option value="Free">Free</option>
                  </select>
                </div>

                {/* Reset Button */}
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 bg-purple-200 text-purple-700 rounded-lg hover:bg-purple-300 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Book Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-500 mb-4"></div>
            <p className="text-purple-600 font-medium">Loading amazing books...</p>
          </div>
        ) : (
          <>
            {books.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-purple-800">
                    {books.length} Books Available
                  </h2>
                  <div className="text-sm text-purple-600">
                    {searchTerm && `Results for "${searchTerm}"`}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <FaBook className="text-4xl text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800 mb-3">
                    No Books Found
                  </h3>
                  <p className="text-purple-600 mb-6 leading-relaxed">
                    We couldn't find any books matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookListPage;