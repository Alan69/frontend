import axios from 'axios';

const api = axios.create({
  baseURL: 'https://synaqtest.kz/tests/api/',
});

export const fetchProducts = () => api.get('products/');
export const fetchProductTests = (productId) => api.get(`products/${productId}/`);

export const fetchTestQuestions = (testIds) => {
  const params = new URLSearchParams();
  testIds.forEach(id => params.append('test_id[]', id));
  return api.get(`tests/questions/?${params.toString()}`);
};

export const submitResult = (data) => api.post('results/', data);
