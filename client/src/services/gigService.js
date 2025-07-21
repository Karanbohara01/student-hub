import axios from 'axios';

const API_URL = '/api/gigs';

const getGigs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getGigById = async (gigId) => {
  const response = await axios.get(`${API_URL}/${gigId}`);
  return response.data;
};
const createGig = async (gigData) => {
  // gigData is now FormData
  const response = await axios.post(API_URL, gigData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
const applyForGig = async (gigId) => {
  const response = await axios.post(`${API_URL}/${gigId}/apply`);
  return response.data;
};

const approveApplicant = async (gigId, applicantId) => {
  const response = await axios.put(`${API_URL}/${gigId}/approve`, { applicantId });
  return response.data;
};
const rejectApplicant = async (gigId, applicantId) => {
  const res = await axios.put(`${API_URL}/${gigId}/reject`, { applicantId });
  return res.data;
};

const gigService = {
  getGigs,
  getGigById,
  createGig,
  applyForGig,
  approveApplicant,
  rejectApplicant
};

export default gigService;