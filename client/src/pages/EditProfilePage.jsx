import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';

const EditProfilePage = () => {
  const { userInfo, login } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        university: userInfo.university || '',
        bio: userInfo.bio || '',
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile(formData);
      login(updatedUser);
      toast.success('Profile updated successfully!');
      navigate(`/profile/${userInfo._id}`);
    } catch (error) {
      toast.error('Failed to update profile.', error);
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
      toast.error('Failed to update picture.', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#6e48aa] p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            Edit Your Profile
          </h1>
        </div>
        <form onSubmit={handleDetailsSubmit} className="space-y-6" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">University</label>
            <input name="university" type="text" value={formData.university} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
          </div>
          <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-[#48aae6] rounded-xl hover:bg-[#3a8cc4] shadow-md border-2 border-black">
            SAVE CHANGES
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <h2 className="text-2xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            Update Profile Picture
          </h2>
          <div className="flex items-center gap-4 mt-4">
            {/* <img src={userInfo?.profilePicture} alt="Current profile" className="w-20 h-20 rounded-full border-4 border-black" /> */}
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${userInfo?.profilePicture}`}
              alt="Current profile"
              className="w-20 h-20 rounded-full border-4 border-black"
            />
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handlePictureChange}
              className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-[#6e48aa] file:font-bold file:bg-purple-50 file:text-[#6e48aa]"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            />
            <button
              onClick={handlePictureUpload}
              type="button"
              className="px-4 py-2 bg-purple-500 text-white font-bold rounded-xl border-2 border-black"
            >
              Upload
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProfilePage;