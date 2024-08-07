import axios from 'axios';

const api = axios.create({
  baseURL: 'https://synaqtest.kz/tests/api/', // Update this to your base API URL
});

export const fetchProducts = () => api.get('products/');
export const fetchProductTests = (productId) => api.get(`products/${productId}/`);
export const fetchQuestion = (testId, questionIndex) => api.get(`questions/`, {
  params: {
    test_id: testId,
    question_index: questionIndex,
  }
});
export const submitResult = (data) => api.post('results/', data);
