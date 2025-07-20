// import axios from 'axios';

// const API_URL = '/api/reviews';

// const createReview = async (reviewData) => {
//   const response = await axios.post(API_URL, reviewData);
//   return response.data;
// };

// const reviewService = {
//   createReview,
// };

// export default reviewService;

import axios from 'axios';

const API_URL = '/api/reviews';

// For reviewing a SELLER
const createReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData);
  return response.data;
};
const createNoteReview = async (noteId, reviewData) => {
  const response = await axios.post(`${API_URL}/notes/${noteId}`, reviewData);
  return response.data;
};


const reviewService = {
  createReview,
  createNoteReview, // <-- Add this
};

export default reviewService;