import axios from 'axios';

const API_URL = '/api/notes';

// Create a new note
const createNote = async (noteData) => {
  // noteData will be a FormData object because it includes a file
  const response = await axios.post(API_URL, noteData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
const getNotes = async (params) => {
  // We'll pass search/filter params here later
  const response = await axios.get(API_URL, { params });
  return response.data;
};

const getNoteById = async (noteId) => {
  const response = await axios.get(`${API_URL}/${noteId}`);
  return response.data;
};

const getCommentsForNote = async (noteId) => {
  const response = await axios.get(`${API_URL}/${noteId}/comments`);
  return response.data;
};

const createComment = async (noteId, commentData) => {
  const response = await axios.post(`${API_URL}/${noteId}/comments`, commentData);
  return response.data;
};
const getTopperNotes = async () => {
  const response = await axios.get(`${API_URL}/toppers`);
  return response.data;
};


const noteService = {
  createNote,
  getNotes,
  getNoteById,
  getCommentsForNote,
  createComment,
  getTopperNotes,
};

export default noteService;