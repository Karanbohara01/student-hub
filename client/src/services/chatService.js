import axios from 'axios';

const API_URL = '/api/chat';

const getConversations = async () => {
  const response = await axios.get(`${API_URL}/conversations`);
  return response.data;
};

const getMessages = async (conversationId) => {
  const response = await axios.get(`${API_URL}/conversations/${conversationId}`);
  return response.data;
};

const findOrCreateConversation = async (receiverId) => {
  const response = await axios.post(`${API_URL}/conversations`, { receiverId });
  return response.data;
};
const uploadChatFile = async (fileData) => {
  const response = await axios.post(`${API_URL}/upload`, fileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const chatService = {
  getConversations,
  getMessages,
  findOrCreateConversation,
  uploadChatFile
};

export default chatService;