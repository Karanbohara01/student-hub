


// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import userService from '../services/userService';
// import useAuthStore from '../store/authStore';
// import { toast } from 'react-hot-toast';
// import StarRating from '../components/StarRating';

// const ProfilePage = () => {
//     const [profileData, setProfileData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { id: userId } = useParams();
//     const { userInfo } = useAuthStore();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const data = await userService.getPublicProfile(userId);
//                 setProfileData(data);
//             } catch (error) {
//                 toast.error('Could not load profile.', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, [userId]);

//     if (loading) return <p>Loading profile...</p>;
//     if (!profileData) return <p>User not found.</p>;

//     const { user, notes, projects, reviews } = profileData;
//     const isOwnProfile = userInfo?._id === user._id;

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-8" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             {/* --- Profile Header --- */}
//             <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-3xl shadow-lg border-4 border-black">
//                 <img src={`${import.meta.env.VITE_BACKEND_URL}${user?.profilePicture}`} alt={user?.name} className="w-32 h-32 rounded-full border-4 border-black" />                <div className="text-center md:text-left">
//                     <h1 className="text-4xl font-bold text-[#6e48aa]">{user?.name}({user?.university})</h1>
//                     <p className="text-lg text-gray-500"></p>
//                     <p className="text-lg text-gray-500">{user.bio}</p>
//                     <div className="mt-2 flex justify-center md:justify-start">
//                         <StarRating rating={user.rating} numReviews={user.numReviews} />
//                     </div>
//                 </div>
//                 <div className="md:ml-auto">
//                     {isOwnProfile ? (
//                         <Link to="/profile/edit" className="px-6 py-2 bg-[#48aae6] text-white font-bold rounded-xl border-2 border-black">Edit My Profile</Link>
//                     ) : (
//                         <button className="px-6 py-2 bg-[#6e48aa] text-white font-bold rounded-xl border-2 border-black">Message</button>
//                     )}
//                 </div>
//             </div>

//             {/* --- Contributions Section --- */}
//             <div className="mt-8">
//                 <h2 className="text-3xl font-bold text-[#6e48aa] mb-4">Contributions</h2>
//                 <div className="p-6 bg-white rounded-3xl shadow-lg border-4 border-black">
//                     <h3 className="text-2xl font-bold mb-4">Notes ({notes.length})</h3>
//                     {/* You can map over and display note links here */}

//                     <h3 className="text-2xl font-bold mt-6 mb-4">Projects ({projects.length})</h3>
//                     {/* You can map over and display project links here */}
//                 </div>
//             </div>

//             {/* --- Reviews Section --- */}
//             <div className="mt-8">
//                 <h2 className="text-3xl font-bold text-[#6e48aa] mb-4">Reviews Received ({reviews.length})</h2>
//                 <div className="p-6 bg-white rounded-3xl shadow-lg border-4 border-black space-y-4">
//                     {reviews.length > 0 ? reviews.map(review => (
//                         <div key={review?._id} className="border-b pb-4">
//                             <div className="flex items-center mb-1">
//                                 <img src={`${import.meta.env.VITE_BACKEND_URL}${review?.user?.profilePicture}`} alt={review?.user?.name} className="w-8 h-8 rounded-full mr-2" />
//                                 <p className="font-bold">{review?.user?.name}</p>
//                             </div>
//                             <StarRating rating={review.rating} />
//                             <p className="text-gray-700 mt-1">{review.comment}</p>
//                         </div>
//                     )) : <p>No reviews yet.</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import userService from '../services/userService';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';
import StarRating from '../components/StarRating';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id: userId } = useParams();
    const { userInfo } = useAuthStore();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getPublicProfile(userId);
                setProfileData(data);
            } catch (error) {
                toast.error('Could not load profile.', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    if (loading) return <p className="text-center text-xl font-bold mt-10">Loading profile...</p>;
    if (!profileData) return <p className="text-center text-xl font-bold mt-10">User not found.</p>;

    const { user, notes, projects, reviews } = profileData;
    const isOwnProfile = userInfo?._id === user._id;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-12" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            {/* --- Profile Header --- */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-3xl shadow-2xl border-4 border-[#6e48aa] hover:shadow-purple-300 transition-shadow duration-300">
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${user?.profilePicture}`}
                    alt={user?.name}
                    className="w-36 h-36 rounded-full border-4 border-black object-cover shadow-lg"
                />
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-4xl font-extrabold text-[#6e48aa]">{user?.name} ({user?.university})</h1>
                    <p className="text-md text-gray-600">{user.bio}</p>
                    <div className="flex justify-center md:justify-start mt-2">
                        <StarRating rating={user.rating} numReviews={user.numReviews} />
                    </div>
                </div>
                <div className="md:ml-auto">
                    {isOwnProfile ? (
                        <Link to="/profile/edit" className="px-6 py-2 bg-purple-500 hover:bg-purple-700 transition-all text-white font-bold rounded-xl border-2 border-black shadow-md">
                            ✏️ Edit My Profile
                        </Link>
                    ) : (
                        <button className="px-6 py-2 bg-[#6e48aa] hover:bg-[#593988] transition-all text-white font-bold rounded-xl border-2 border-black shadow-md">
                            💬 Message
                        </button>
                    )}
                </div>
            </div>

            {/* --- Contributions Section --- */}
            <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#6e48aa] border-b-4 border-[#6e48aa] inline-block pb-2">📚 Contributions</h2>
                <div className="p-6 bg-white rounded-3xl shadow-xl border-4 border-black space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">📝 Notes ({notes.length})</h3>
                        <div className="space-y-1">
                            {notes.length > 0 ? notes.map(note => (
                                <Link to={`/notes/${note._id}`} key={note._id} className="block text-[#6e48aa] hover:underline">
                                    • {note.title}
                                </Link>
                            )) : <p className="text-gray-500">No notes uploaded yet.</p>}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-4 mb-2">💼 Projects ({projects.length})</h3>
                        <div className="space-y-1">
                            {projects.length > 0 ? projects.map(project => (
                                <Link to={`/projects/${project._id}`} key={project._id} className="block text-[#6e48aa] hover:underline">
                                    • {project.title}
                                </Link>
                            )) : <p className="text-gray-500">No projects added yet.</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Reviews Section --- */}
            <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#6e48aa] border-b-4 border-[#6e48aa] inline-block pb-2">🌟 Reviews Received ({reviews.length})</h2>
                <div className="p-6 bg-white rounded-3xl shadow-xl border-4 border-black space-y-6">
                    {reviews.length > 0 ? reviews.map(review => (
                        <div key={review._id} className="border-b pb-4 last:border-none">
                            <div className="flex items-center mb-1">
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}${review?.user?.profilePicture}`}
                                    alt={review?.user?.name}
                                    className="w-8 h-8 rounded-full mr-2 border border-gray-300"
                                />
                                <p className="font-bold text-[#6e48aa]">{review?.user?.name}</p>
                            </div>
                            <StarRating rating={review.rating} />
                            <p className="text-gray-700 mt-1">{review.comment}</p>
                        </div>
                    )) : (
                        <p className="text-gray-500 italic">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
