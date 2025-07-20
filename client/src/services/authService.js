import axios from 'axios';

const API_URL = '/api/auth';
const API_URL_USERS = '/api/users';


const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

// --- THIS IS THE MISSING FUNCTION ---
const verifyEmail = async (token) => {
    const response = await axios.get(`${API_URL}/verify-email/${token}`);
    return response.data;
};

const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
};

const resetPassword = async (token, password) => {
    const response = await axios.put(`${API_URL}/reset-password/${token}`, { password });
    return response.data;
};

const addNoteToFavorites = async (noteId) => {
    const response = await axios.put(`${API_URL_USERS}/favorites`, { noteId });
    return response.data;
};
const removeNoteFromFavorites = async (noteId) => {
    // Axios delete method sends data in a 'data' property
    const response = await axios.delete(`${API_URL_USERS}/favorites`, { data: { noteId } });
    return response.data;
};

const getFavoriteNotes = async () => {
    const response = await axios.get(`${API_URL_USERS}/favorites`);
    return response.data;
};

const authService = {
    register,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    addNoteToFavorites,
    getFavoriteNotes,
    removeNoteFromFavorites,
};


export default authService;