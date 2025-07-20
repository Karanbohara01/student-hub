// import { useState, useEffect } from 'react';
// import useAuthStore from '../store/authStore';
// import authService from '../services/authService';
// import { toast } from 'react-hot-toast';

// const ProfilePage = () => {
//     const { userInfo, login } = useAuthStore();

//     const [name, setName] = useState('');
//     const [university, setUniversity] = useState('');
//     const [bio, setBio] = useState('');

//     // Pre-fill the form with user data when the component loads
//     useEffect(() => {
//         if (userInfo) {
//             setName(userInfo.name);
//             setUniversity(userInfo.university || '');
//             setBio(userInfo.bio || '');
//         }
//     }, [userInfo]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedData = { name, university, bio };
//             const data = await authService.updateProfile(updatedData);
//             login(data); // Update the global state with the new user info
//             toast.success('Profile updated successfully!');
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Update failed');
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {/* Display Info Card */}
//                 <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">Current Info</h2>
//                     <div className="space-y-4">
//                         <div>
//                             <p className="text-sm font-medium text-gray-500">Name</p>
//                             <p className="text-lg">{userInfo?.name}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm font-medium text-gray-500">Email</p>
//                             <p className="text-lg">{userInfo?.email}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm font-medium text-gray-500">University</p>
//                             <p className="text-lg">{userInfo?.university || 'Not set'}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Update Form Card */}
//                 <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">Update Details</h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                             <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//                         </div>
//                         <div>
//                             <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
//                             <input id="university" type="text" value={university} onChange={(e) => setUniversity(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//                         </div>
//                         <div>
//                             <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
//                             <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows="3" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//                         </div>
//                         <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Update Profile</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
    const { userInfo, login } = useAuthStore();

    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [bio, setBio] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Pre-fill the form with user data when the component loads
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setUniversity(userInfo.university || '');
            setBio(userInfo.bio || '');
        }
    }, [userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { name, university, bio };
            const data = await authService.updateProfile(updatedData);
            login(data); // Update the global state with the new user info
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header with Duolingo-style owl */}
            <div className="text-center mb-8 relative">
                <div className="w-24 h-24 bg-purple-600 rounded-full mx-auto flex items-center justify-center shadow-lg mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-purple-900 mb-2">Your Profile</h1>
                <p className="text-purple-600">Level up your learning journey!</p>

                {/* Streak indicator (Duolingo-style) */}
                <div className="absolute top-0 right-0 bg-purple-100 rounded-full px-4 py-2 flex items-center shadow-sm">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-sm font-bold">🔥</span>
                    </div>
                    <span className="font-bold text-purple-800">7 day streak</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card - Duolingo-style with achievements */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200 transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="bg-purple-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">Current Stats</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-purple-500">Name</p>
                                        <p className="text-lg font-semibold text-gray-800">{userInfo?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-purple-500">Email</p>
                                        <p className="text-lg font-semibold text-gray-800">{userInfo?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-purple-500">University</p>
                                        <p className="text-lg font-semibold text-gray-800">{userInfo?.university || 'Not set'}</p>
                                    </div>
                                </div>

                                {/* XP Progress Bar (Duolingo-style) */}
                                <div className="pt-4">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-purple-600">Learning XP</span>
                                        <span className="text-sm font-medium text-purple-600">1,240/2,000</span>
                                    </div>
                                    <div className="w-full bg-purple-200 rounded-full h-2.5">
                                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements section */}
                            <div className="bg-purple-50 px-6 py-4 border-t border-purple-100">
                                <h3 className="font-bold text-purple-800 mb-3">Achievements</h3>
                                <div className="flex space-x-3">
                                    {['🏆', '⭐', '🎯', '🏅'].map((emoji, index) => (
                                        <div key={index} className="bg-white p-3 rounded-full shadow-sm border border-purple-200">
                                            <span className="text-xl">{emoji}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Form - Expanded to two columns */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200">
                            <div className="bg-purple-600 px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Update Your Profile</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-bold hover:bg-purple-50 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 bg-purple-700 text-white rounded-full text-sm font-bold hover:bg-purple-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>

                            <div className="p-6">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-purple-700 mb-1">Full Name</label>
                                            <div className="relative">
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-3 pl-11 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                    placeholder="Enter your full name"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="university" className="block text-sm font-medium text-purple-700 mb-1">University</label>
                                            <div className="relative">
                                                <input
                                                    id="university"
                                                    type="text"
                                                    value={university}
                                                    onChange={(e) => setUniversity(e.target.value)}
                                                    className="w-full px-4 py-3 pl-11 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                    placeholder="Where do you study?"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="bio" className="block text-sm font-medium text-purple-700 mb-1">Bio</label>
                                            <div className="relative">
                                                <textarea
                                                    id="bio"
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    rows="4"
                                                    className="w-full px-4 py-3 pl-11 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                    placeholder="Tell us about yourself..."
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-[1.01]"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm font-medium text-purple-500 mb-1">Full Name</p>
                                            <p className="text-lg font-semibold text-gray-800 px-2 py-3 bg-purple-50 rounded-lg">{name}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-purple-500 mb-1">University</p>
                                            <p className="text-lg font-semibold text-gray-800 px-2 py-3 bg-purple-50 rounded-lg">{university || 'Not specified'}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-purple-500 mb-1">Bio</p>
                                            <p className="text-lg font-semibold text-gray-800 px-2 py-3 bg-purple-50 rounded-lg min-h-[100px]">
                                                {bio || 'No bio added yet. Click "Edit Profile" to add one!'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Daily Goal Card (Duolingo-style) */}
                        <div className="mt-6 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200">
                            <div className="bg-purple-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">Daily Learning Goal</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Daily Target</p>
                                            <p className="text-sm text-purple-600">20 minutes</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-bold hover:bg-purple-700 transition-colors">
                                        Change Goal
                                    </button>
                                </div>

                                <div className="relative pt-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                                                Today's Progress
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-purple-600">
                                                15/20 min
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                                        <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;