

import axios from 'axios';

const API_URL = '/api/books';


const getBookListings = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

const getBookById = async (bookId) => {
  const response = await axios.get(`${API_URL}/${bookId}`);
  return response.data;
};

const createBookListing = async (bookData) => {
  const response = await axios.post(API_URL, bookData);
  return response.data;
};

// --- You are missing these functions ---
const updateBookListing = async (bookId, bookData) => {
  const response = await axios.put(`${API_URL}/${bookId}`, bookData);
  return response.data;
};

const deleteBookListing = async (bookId) => {
  const response = await axios.delete(`${API_URL}/${bookId}`);
  return response.data;
};
const getMyBookListings = async () => {
  const response = await axios.get(`${API_URL}/my-listings`);
  return response.data;
};
const updateListingStatus = async (bookId, status) => {
  const response = await axios.put(`${API_URL}/${bookId}/status`, { status });
  return response.data;
};


const bookService = {
  getBookListings,
  getBookById,
  createBookListing,
  updateBookListing, // <-- Make sure this is included
  deleteBookListing, // <-- Make sure this is included
  getMyBookListings,
  updateListingStatus,
};

export default bookService;