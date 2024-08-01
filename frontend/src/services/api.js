import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export async function girisYap(credentials) {
  try {
    const response = await api.post('/giris', credentials);
    return response;
  } catch (error) {
    throw error.response.data;
  }
}

export async function kayitOl(credentials) {
  try {
    const response = await api.post('/kayit', credentials);
    return response;
  } catch (error) {
    throw error.response.data;
  }
}

export async function kullanicilariGetir() {
  try {
    const response = await api.get('/kullanicilar');
    return response;
  } catch (error) {
    throw error.response.data;
  }
}

export default api;
