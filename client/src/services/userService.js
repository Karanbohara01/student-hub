import axios from 'axios';

const API_URL = '/api/users';

// Fetch a user's complete public profile
const getPublicProfile = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}/profile`);
  return response.data;
};

const userService = {
  getPublicProfile,
};

export default userService;