import axios from 'axios';

// for post
const api = axios.create({
  baseURL: 'https://synaqtest.kz/tests/api/',
});

// for get
const API_BASE_URL = 'https://synaqtest.kz/tests/api/';

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const fetchProduct = (productId) => api.get(`products/${productId}/`);

export const fetchTests = (productId) => api.get('tests/', {
  params: { product: productId }
});

export const purchaseProduct = (productId) => api.post(`products/${productId}/purchase/`);

// export const fetchTests = async (productId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}tests/`, {
//       params: { product: productId.join(',') }
//     });
//     return response;
//   } catch (error) {
//     console.error('Error fetching tests:', error);
//     return { data: [] }; // Return an empty array if an error occurs
//   }
// };

export const fetchTestQuestions = async (testId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}questions/`, {
      params: { test_id: testId }
    });
    return response;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return { data: [] }; // Return an empty array if an error occurs
  }
};

export const fetchOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}options/`);
    return response;
  } catch (error) {
    console.error('Error fetching options:', error);
    return { data: [] }; // Return an empty array if an error occurs
  }
};

export const submitResult = async (resultData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}submit/`, resultData);
    return response;
  } catch (error) {
    console.error('Error submitting results:', error);
    throw error; // Rethrow error to handle it in the component
  }
};