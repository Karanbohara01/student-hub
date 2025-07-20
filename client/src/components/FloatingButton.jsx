import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const FloatingButton = () => {
  return (
    <Link
      to="/notes-from-toppers"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3 bg-[#6e48aa] text-white font-bold rounded-2xl shadow-lg border-2 border-black hover:bg-[#5a3a8a] transition-all duration-200 transform hover:scale-105"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      <FaStar />
      Notes from Toppers
    </Link>
  );
};

export default FloatingButton;