

import axios from 'axios';

const API_URL = '/api/admin';

const getAllNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

const updateNoteStatus = async (noteId, status) => {
  const response = await axios.put(`${API_URL}/notes/${noteId}/status`, { status });
  return response.data;
};

const featureNote = async (noteId, topperData) => {
  const response = await axios.put(`${API_URL}/notes/${noteId}/feature`, topperData);
  return response.data;
}

const adminService = {
  getAllNotes,
  updateNoteStatus,
  featureNote,
};

export default adminService;

