

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FiHeart, FiSearch, FiX, FiFilter, FiBookmark, FiClock } from 'react-icons/fi';
import { FaHeartBroken } from 'react-icons/fa';

const FavoriteNoteCard = ({ note, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e) => {
    e.preventDefault();
    setIsRemoving(true);

    try {
      await authService.removeNoteFromFavorites(note._id);
      toast.success('Removed from favorites!', {
        icon: <FaHeartBroken className="text-pink-500" />,
      });
      onRemove();
    } catch (error) {
      toast.error('Failed to remove note', error);
      setIsRemoving(false);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/notes/${note._id}`} className="block">
        <motion.div
          className={`bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col border-2 ${isHovered ? 'border-[#6e48aa]' : 'border-transparent'} transition-all duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
        >
          {/* Favorite button */}
          <motion.button
            onClick={handleRemove}
            disabled={isRemoving}
            className={`absolute top-2 right-2 p-2 rounded-full ${isRemoving ? 'bg-gray-100' : 'bg-[#f8f1ff] hover:bg-[#e9d5ff]'} transition-colors`}
            whileTap={{ scale: 0.9 }}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            aria-label="Remove from favorites"
          >
            <FiHeart className={`text-lg ${isRemoving ? 'text-gray-400' : 'text-[#6e48aa] fill-[#6e48aa]'}`} />
          </motion.button>

          {/* Content */}
          <div className="flex-grow">
            <h3
              className="text-lg font-bold text-[#6e48aa] mb-2 line-clamp-2"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
              {note.title}
            </h3>
            <div className="flex items-center mb-2">
              <span
                className="text-xs font-bold text-gray-500 mr-2"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                {note.subject}
              </span>
              {note.category && (
                <span className="text-xs px-2 py-1 rounded-full bg-[#f0e6ff] text-[#6e48aa]">
                  {note.category}
                </span>
              )}
            </div>
            {note.description && (
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {note.description}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-400">
              <FiClock className="mr-1" />
              {new Date(note.updatedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center text-xs text-[#6e48aa]">
              <FiBookmark className="mr-1" />
              {note.favoriteCount || 0}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const MyFavoritesPage = () => {
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await authService.getFavoriteNotes();
      setFavoriteNotes(data);
    } catch (error) {
      toast.error('Could not fetch your favorite notes.', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const filteredNotes = favoriteNotes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = filter === 'all' || note.category === filter;

    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...new Set(favoriteNotes.map(note => note.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-[#6e48aa] rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-4xl font-bold text-[#6e48aa] mb-2"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          My Favorite Notes
        </h1>
        <p className="text-gray-500">Your personal collection of saved notes</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="mb-8 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your favorites..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FiFilter />
            <span>Filter</span>
          </button>

          {showFilters && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 p-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="p-2 font-medium text-gray-500">Categories</div>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setFilter(category);
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${filter === category ? 'text-[#6e48aa] font-medium' : 'text-gray-700'}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <FavoriteNoteCard
                key={note._id}
                note={note}
                onRemove={fetchFavorites}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {searchQuery || filter !== 'all' ? (
            <>
              <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No matching favorites found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilter('all');
                }}
                className="px-4 py-2 bg-[#6e48aa] text-white rounded-lg hover:bg-[#5d3a9e] transition-colors"
              >
                Clear filters
              </button>
            </>
          ) : (
            <>
              <FiHeart className="mx-auto text-4xl text-[#6e48aa] mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-4">Save notes by clicking the heart icon on any note</p>
              <Link
                to="/notes"
                className="px-4 py-2 bg-[#6e48aa] text-white rounded-lg hover:bg-[#5d3a9e] transition-colors"
              >
                Browse notes
              </Link>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MyFavoritesPage;