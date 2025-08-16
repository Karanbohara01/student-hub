// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// const StarRating = ({ rating, numReviews }) => {
//   return (
//     <div className="flex items-center" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//       <span>
//         {rating >= 1 ? <FaStar color="#ffc107" /> : rating >= 0.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
//       </span>
//       <span>
//         {rating >= 2 ? <FaStar color="#ffc107" /> : rating >= 1.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
//       </span>
//       <span>
//         {rating >= 3 ? <FaStar color="#ffc107" /> : rating >= 2.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
//       </span>
//       <span>
//         {rating >= 4 ? <FaStar color="#ffc107" /> : rating >= 3.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
//       </span>
//       <span>
//         {rating >= 5 ? <FaStar color="#ffc107" /> : rating >= 4.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
//       </span>
//       <span className="ml-2 text-sm text-gray-600">({numReviews} reviews)</span>
//     </div>
//   );
// };

// export default StarRating;

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating = 0, numReviews = 0 }) => {
  // Generate 5 stars dynamically
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    if (rating >= starValue) return <FaStar key={index} color="#ffc107" />;
    if (rating >= starValue - 0.5) return <FaStarHalfAlt key={index} color="#ffc107" />;
    return <FaRegStar key={index} color="#e4e5e9" />;
  });

  return (
    <div className="flex items-center space-x-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <div className="flex space-x-0.5">{stars}</div>
      {numReviews > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          ({numReviews} {numReviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default StarRating;
