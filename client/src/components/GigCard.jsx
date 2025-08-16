

import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const GigCard = ({ gig }) => {
  return (
    <Link to={`/gigs/${gig._id}`} className="block group transform transition-transform duration-300 hover:scale-[1.02]">
      <div
        className="bg-white rounded-3xl shadow-xl p-6 border-4 border-black group-hover:border-[#6e48aa] transition-all duration-300 flex flex-col justify-between h-full"
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
      >
        {/* --- Subject --- */}
        <div className="flex-grow">
          <p className="text-xs uppercase font-extrabold text-gray-500 tracking-wide bg-gray-100 inline-block px-3 py-1 rounded-full shadow mb-2">
            {gig.subject}
          </p>

          {/* --- Title --- */}
          <h3 className="text-2xl font-bold text-[#6e48aa] group-hover:text-[#4e3480] transition-colors duration-300">
            {gig.title}
          </h3>
        </div>

        {/* --- Footer Section --- */}
        <div className="mt-6 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
          {/* Budget */}
          <p className="text-xl font-extrabold text-purple-600">
            Rs. {gig.budget}
          </p>

          {/* Requester */}
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-gray-500 text-lg" />
            <span className="text-sm font-bold text-gray-700">
              {gig.requester.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
