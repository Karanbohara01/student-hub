

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import LeaveReview from '../components/LeaveReview';
import chatService from '../services/chatService';
// Update your icon imports at the top of the file to:
import {
  FaArrowLeft,
  FaEdit,
  FaStar,
  FaExchangeAlt,
  FaMoneyBillAlt as FaMoneyBill,
  FaGift,
  FaBook,
  FaRegComment as FaMessage
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { id: bookId } = useParams();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getBookById(bookId);
        setBook(data);
      } catch (error) {
        toast.error('Could not fetch book details.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleMessageSeller = async () => {
    if (!userInfo) {
      return toast.error('You must be logged in to message a seller.');
    }
    try {
      const conversation = await chatService.findOrCreateConversation(book.user._id);
      navigate('/chat', { state: { conversationId: conversation._id } });
    } catch (error) {
      toast.error('Could not start conversation.');
      console.error(error);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
        <p
          className="text-xl text-purple-800"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          Loading book details...
        </p>
      </div>
    </div>
  );

  if (!book) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg">
        <p
          className="text-xl text-purple-800 mb-4"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          Book not found
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          <FaArrowLeft /> Back to Books
        </Link>
      </div>
    </div>
  );

  const isOwner = userInfo?._id === book.user?._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">

      {/* Floating Back Button */}
      <div className="fixed top-4 left-4 z-10">
        <Link
          to="/books"
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg text-purple-900 hover:bg-purple-100 transition-colors"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          <FaArrowLeft /> Back
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Book Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-purple-200">

          {/* Book Cover and Basic Info */}
          <div className="md:flex">
            <div className="md:w-1/3 p-6 bg-purple-50 flex items-center justify-center">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
                alt={book.title}
                className="w-full max-w-xs h-auto object-cover rounded-lg shadow-md border-2 border-purple-200"
              />
            </div>

            <div className="md:w-2/3 p-6">
              {/* Title and Author */}
              <div className="mb-4">
                <h1
                  className="text-3xl font-bold text-purple-900 mb-2"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  {book.title}
                </h1>
                <p
                  className="text-xl text-purple-700"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  by {book.author}
                </p>

              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${book.status === 'Available'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-red-100 text-red-800'
                    }`}
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  {book.status}
                </span>
              </div>

              {/* Condition and Listing Type */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p
                    className="text-sm font-bold text-purple-600 mb-1"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    CONDITION
                  </p>
                  <p
                    className="text-lg font-bold text-purple-900"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    {book.condition}
                  </p>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <p
                    className="text-sm font-bold text-purple-600 mb-1"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    LISTING TYPE
                  </p>
                  <p
                    className="text-lg font-bold text-purple-900 flex items-center"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    {book.listingType === 'Sell' && <FaMoneyBill className="mr-2" />}
                    {book.listingType === 'Exchange' && <FaExchangeAlt className="mr-2" />}
                    {book.listingType === 'Free' && <FaGift className="mr-2" />}
                    {book.listingType}
                  </p>
                </div>
              </div>

              {/* Price/Exchange Details */}
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                {book.listingType === 'Sell' && (
                  <p
                    className="text-xl font-bold text-purple-900 flex items-center"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    <FaMoneyBill className="mr-2 text-yellow-600" />
                    Price: Rs. {book.price}
                  </p>
                )}
                {book.listingType === 'Exchange' && (
                  <p
                    className="text-xl font-bold text-purple-900 flex items-center"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    <FaExchangeAlt className="mr-2 text-yellow-600" />
                    Wants to exchange for: {book.exchangeDetails}
                  </p>
                )}
                {book.listingType === 'Free' && (
                  <p
                    className="text-xl font-bold text-purple-900 flex items-center"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    <FaGift className="mr-2 text-yellow-600" />
                    This book is available for free!
                  </p>
                )}

              </div>

            </div>
          </div>

          {/* Additional Details */}
          {book.description && (
            <div className="p-6 border-t border-purple-100">
              <h2
                className="text-xl font-bold text-purple-900 mb-3 flex items-center"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                <FaBookOpen className="mr-2" /> Description
              </h2>
              <p
                className="text-gray-700"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                {book.description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-6 border-t border-purple-100">
            <div className="flex flex-col sm:flex-row gap-4">
              {isOwner ? (
                <Link
                  to={`/books/${book._id}/edit`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  <FaEdit /> EDIT LISTING
                </Link>
              ) : (
                <>
                  <button
                    onClick={handleMessageSeller}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    <FaMessage /> MESSAGE SELLER
                  </button>
                  {!showReviewForm && (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-bold"
                      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                    >
                      <FaStar /> LEAVE REVIEW
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && userInfo && (
            <div className="p-6 border-t border-purple-100 relative">
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={24} />
              </button>
              {showReviewForm && userInfo && (
                <LeaveReview
                  targetId={book.user._id} // Pass the seller's ID as targetId
                  reviewType="seller"      // Tell the component this is a seller review
                  onReviewSubmitted={() => setShowReviewForm(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;