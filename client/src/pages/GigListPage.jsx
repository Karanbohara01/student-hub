import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gigService from '../services/gigService';
import { toast } from 'react-hot-toast';
import GigCard from '../components/GigCard';

const GigListPage = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const data = await gigService.getGigs();
        setGigs(data);
      } catch (error) {
        toast.error('Could not fetch gigs.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, []);

  if (loading) return <p className="text-center p-10">Loading gigs...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          Assignment Board
        </h1>
        <Link
          to="/gigs/create"
          className="w-full md:w-auto text-center px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md border-2 border-black"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          + Post a Gig
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.length > 0 ? (
          gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No open gigs at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default GigListPage;