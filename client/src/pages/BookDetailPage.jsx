

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import chatService from '../services/chatService';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import LeaveReview from '../components/LeaveReview';
import {
  FaArrowLeft,
  FaEdit,
  FaStar,
  FaExchangeAlt,
  FaMoneyBillAlt as FaMoneyBill,
  FaGift,
  FaBookOpen,
  FaRegComment as FaMessage,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-xl text-purple-800" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <p className="text-xl text-purple-800 mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
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
  }

  const isOwner = userInfo?._id === book.user?._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-10 px-4">
      <Link
        to="/books"
        className="flex items-center w-25    gap-2 px-4 py-2 mb-2    text-purple-700  hover:bg-purple-100 transition-colors"
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
      >
        <FaArrowLeft /> Back
      </Link>


      {/* Book Card Layout */}


      <div
        className="max-w-6xl mx-auto     overflow-hidden     flex flex-col md:flex-row"
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
      >
        {/* LEFT: Book Cover */}
        <div className="md:w-1/2   p-8 flex items-center justify-center border-r border-purple-100">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${book.coverImage}`}
            alt={book.title}
            className="w-full max-w-sm object-cover  "
          />
        </div>

        {/* RIGHT: Book Info */}
        <div className="md:w-1/2 p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-900 mb-1">{book.title}</h1>
            <p className="text-xl text-purple-700">by {book.author}</p>
          </div>

          <div className='flex justify-between'>

            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
              {book.status}
            </span>



          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-purple-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-purple-600 font-bold">CONDITION</p>
              <p className="text-lg font-bold text-purple-900">{book.condition}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-purple-600 font-bold">LISTING TYPE</p>
              <p className="text-lg font-bold text-purple-900 flex items-center">
                {book.listingType === 'Sell' && <FaMoneyBill className="mr-2" />}
                {book.listingType === 'Exchange' && <FaExchangeAlt className="mr-2" />}
                {book.listingType === 'Free' && <FaGift className="mr-2" />}
                {book.listingType}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            {book.listingType === 'Sell' && (
              <p className="text-xl font-bold text-purple-900 flex items-center">
                <FaMoneyBill className="mr-2 text-yellow-600" />
                Price: Rs. {book.price}
              </p>
            )}
            {book.listingType === 'Exchange' && (
              <p className="text-xl font-bold text-purple-900 flex items-center">
                <FaExchangeAlt className="mr-2 text-yellow-600" />
                Wants to exchange for: {book.exchangeDetails}
              </p>
            )}
            {book.listingType === 'Free' && (
              <p className="text-xl font-bold text-purple-900 flex items-center">
                <FaGift className="mr-2 text-yellow-600" />
                This book is available for free!
              </p>
            )}
          </div>

          {book.description && (
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-1 flex items-center">
                <FaBookOpen className="mr-2" /> Description
              </h2>
              <p className="text-gray-700">{book.description}</p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {isOwner ? (
              <Link
                to={`/books/${book._id}/edit`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
              >
                <FaEdit /> EDIT LISTING
              </Link>
            ) : (
              <>
                <button
                  onClick={handleMessageSeller}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
                >
                  <FaMessage /> MESSAGE SELLER
                </button>
                {!showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-bold"
                  >
                    <FaStar /> LEAVE REVIEW
                  </button>
                )}
              </>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && userInfo && (
            <div className="mt-4 relative border-t pt-4 border-purple-100">
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={24} />
              </button>
              <LeaveReview
                targetId={book.user._id}
                reviewType="seller"
                onReviewSubmitted={() => setShowReviewForm(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
