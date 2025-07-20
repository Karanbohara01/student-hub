import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, numReviews }) => {
  return (
    <div className="flex items-center" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <span>
        {rating >= 1 ? <FaStar color="#ffc107" /> : rating >= 0.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
      </span>
      <span>
        {rating >= 2 ? <FaStar color="#ffc107" /> : rating >= 1.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
      </span>
      <span>
        {rating >= 3 ? <FaStar color="#ffc107" /> : rating >= 2.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
      </span>
      <span>
        {rating >= 4 ? <FaStar color="#ffc107" /> : rating >= 3.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
      </span>
      <span>
        {rating >= 5 ? <FaStar color="#ffc107" /> : rating >= 4.5 ? <FaStarHalfAlt color="#ffc107" /> : <FaRegStar color="#e4e5e9" />}
      </span>
      <span className="ml-2 text-sm text-gray-600">({numReviews} reviews)</span>
    </div>
  );
};

export default StarRating;