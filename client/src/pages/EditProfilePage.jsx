// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';
// import authService from '../services/authService';
// import { toast } from 'react-hot-toast';

// const EditProfilePage = () => {
//   const { userInfo, login } = useAuthStore();
//   const [formData, setFormData] = useState({
//     name: '',
//     university: '',
//     bio: '',
//   });
//   const [profilePicture, setProfilePicture] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userInfo) {
//       setFormData({
//         name: userInfo.name,
//         university: userInfo.university || '',
//         bio: userInfo.bio || '',
//       });
//     }
//   }, [userInfo]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePictureChange = (e) => {
//     setProfilePicture(e.target.files[0]);
//   };

//   const handleDetailsSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedUser = await authService.updateProfile(formData);
//       login(updatedUser);
//       toast.success('Profile updated successfully!');
//       navigate(`/profile/${userInfo._id}`);
//     } catch (error) {
//       toast.error('Failed to update profile.', error);
//     }
//   };

//   const handlePictureUpload = async () => {
//     if (!profilePicture) {
//       return toast.error('Please select an image to upload.');
//     }
//     const picFormData = new FormData();
//     picFormData.append('profilePicture', profilePicture);
//     try {
//       const data = await authService.updateProfilePicture(picFormData);
//       login({ ...userInfo, profilePicture: data.profilePicture });
//       toast.success('Profile picture updated!');
//     } catch (error) {
//       toast.error('Failed to update picture.', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#6e48aa] p-4">
//       <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             Edit Your Profile
//           </h1>
//         </div>
//         <form onSubmit={handleDetailsSubmit} className="space-y-6" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
//             <input name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//           </div>
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">University</label>
//             <input name="university" type="text" value={formData.university} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//           </div>
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">Bio</label>
//             <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//           </div>
//           <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-[#48aae6] rounded-xl hover:bg-[#3a8cc4] shadow-md border-2 border-black">
//             SAVE CHANGES
//           </button>
//         </form>

//         <div className="mt-8 pt-6 border-t-2 border-gray-200">
//           <h2 className="text-2xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             Update Profile Picture
//           </h2>
//           <div className="flex items-center gap-4 mt-4">
//             <img
//               src={`${import.meta.env.VITE_BACKEND_URL}${userInfo?.profilePicture}`}
//               alt="Current profile"
//               className="w-20 h-20 rounded-full border-4 border-black"
//             />
//             <input
//               type="file"
//               name="profilePicture"
//               accept="image/*"
//               onChange={handlePictureChange}
//               className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-[#6e48aa] file:font-bold file:bg-purple-50 file:text-[#6e48aa]"
//               style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//             />
//             <button
//               onClick={handlePictureUpload}
//               type="button"
//               className="px-4 py-2 bg-purple-500 text-white font-bold rounded-xl border-2 border-black"
//             >
//               Upload
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';
import { FaUserEdit, FaUniversity, FaPen, FaCamera, FaArrowLeft } from 'react-icons/fa';
import { RiUserSettingsLine } from 'react-icons/ri';

const EditProfilePage = () => {
  const { userInfo, login } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        university: userInfo.university || '',
        bio: userInfo.bio || '',
      });
      if (userInfo.profilePicture) {
        setPreviewImage(`${import.meta.env.VITE_BACKEND_URL}${userInfo.profilePicture}`);
      }
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile(formData);
      login(updatedUser);
      toast.success('Profile updated successfully!');
      navigate(`/profile/${userInfo._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  const handlePictureUpload = async () => {
    if (!profilePicture) {
      return toast.error('Please select an image to upload.');
    }
    const picFormData = new FormData();
    picFormData.append('profilePicture', profilePicture);
    try {
      const data = await authService.updateProfilePicture(picFormData);
      login({ ...userInfo, profilePicture: data.profilePicture });
      toast.success('Profile picture updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update picture.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-colors"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          <FaArrowLeft className="mr-2" />
          Back to Profile
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <RiUserSettingsLine className="text-white text-3xl" />
              <h1
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                Edit Your Profile
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <img
                  src={previewImage || '/default-profile.png'}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full border-4 border-purple-300 object-cover shadow-lg"
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-all transform group-hover:scale-110"
                  title="Change photo"
                >
                  <FaCamera />
                  <input
                    id="profilePicture"
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={handlePictureUpload}
                disabled={!profilePicture}
                className={`mt-4 px-6 py-2 rounded-xl font-bold flex items-center ${profilePicture ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'} transition-colors shadow-md`}
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                <FaPen className="mr-2" />
                Update Picture
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-bold text-purple-800">
                  <FaUserEdit className="mr-2" />
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 text-gray-700 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-bold text-purple-800">
                  <FaUniversity className="mr-2" />
                  University
                </label>
                <input
                  name="university"
                  type="text"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-5 py-3 text-gray-700 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-bold text-purple-800">
                  <FaPen className="mr-2" />
                  About You
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-5 py-3 text-gray-700 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-[1.01] transition-all focus:outline-none focus:ring-4 focus:ring-purple-300"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  SAVE PROFILE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(`/profile/${userInfo._id}`)}
            className="text-purple-600 hover:text-purple-800 font-medium"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            Cancel and return to profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
