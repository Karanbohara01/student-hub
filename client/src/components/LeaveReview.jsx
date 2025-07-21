// import { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { FaStar } from 'react-icons/fa';
// import reviewService from '../services/reviewService';

// const LeaveReview = ({ sellerId, onReviewSubmitted }) => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [comment, setComment] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (rating === 0) {
//       return toast.error('Please select a star rating.');
//     }
//     try {
//       await reviewService.createReview({ sellerId, rating, comment });
//       toast.success('Thank you for your review!');
//       onReviewSubmitted();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to submit review.');
//     }
//   };

//   return (
//     <div className="mt-8 border-t-2 border-gray-200 pt-6">
//       <h2 className="text-2xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Leave a Review</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//         {/* Star Rating */}
//         <div className="flex items-center space-x-2">
//           {[...Array(5)].map((star, index) => {
//             const currentRating = index + 1;
//             return (
//               <label key={index}>
//                 <input
//                   type="radio"
//                   name="rating"
//                   value={currentRating}
//                   onClick={() => setRating(currentRating)}
//                   className="hidden"
//                 />
//                 <FaStar
//                   className="cursor-pointer transition-colors"
//                   size={30}
//                   color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
//                   onMouseEnter={() => setHover(currentRating)}
//                   onMouseLeave={() => setHover(0)}
//                 />
//               </label>
//             );
//           })}
//         </div>
//         {/* Comment Box */}
//         <textarea
//           placeholder="Share your experience..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           required
//           rows="4"
//           className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//         />
//         <button
//           type="submit"
//           className="px-6 py-2 bg-[#58cc02] text-white font-bold rounded-xl hover:bg-[#46a302] shadow-md border-2 border-black"
//           style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//         >
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LeaveReview;

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import reviewService from '../services/reviewService';

// This component now takes a generic 'targetId' and a 'reviewType'
const LeaveReview = ({ targetId, reviewType, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      return toast.error('Please select a star rating.');
    }
    try {
      if (reviewType === 'note') {
        // If it's a note, call the createNoteReview service
        await reviewService.createNoteReview(targetId, { rating, comment });
      } else {
        // Otherwise, call the service for reviewing a seller
        await reviewService.createReview({ sellerId: targetId, rating, comment });
      }
      toast.success('Thank you for your review!');
      onReviewSubmitted(); // Notify parent component to hide the form
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review.');
    }
  };

  return (
    <div className="mt-8 border-t-2 border-gray-200 pt-6">
      <h2 className="text-2xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Star Rating */}
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer transition-colors"
                  size={30}
                  color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        {/* Comment Box */}
        <textarea
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows="4"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md border-2 border-black"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default LeaveReview;