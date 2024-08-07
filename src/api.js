import axios from 'axios';

const api = axios.create({
  baseURL: 'https://synaqtest.kz/tests/api/', // Update this to your base API URL
});

export const fetchProducts = () => api.get('products/');
export const fetchProductTests = (productId) => api.get(`products/${productId}/`);
export const fetchQuestionWithOptions = (testId, questionId) => {
  const url = questionId 
    ? `questions/${questionId}/options/` 
    : `tests/${testId}/questions/`; // Fetch the next question if questionId is null
  return api.get(url);
};
export const submitResult = (data) => api.post('results/', data);
