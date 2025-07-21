import axios from 'axios';

const API_URL = '/api/payments';

const initiateEsewaPayment = async (productId) => {
  const response = await axios.post(`${API_URL}/esewa/initiate`, { productId }, {
    withCredentials: true, // 🔒 include if auth token is in cookie
  });
  return response.data;
};

const paymentService = {
  initiateEsewaPayment,
};

export default paymentService;
