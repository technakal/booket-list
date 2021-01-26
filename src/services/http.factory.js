import axios from 'axios';
const API_URL = 'http://localhost:3000';

export default () => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  instance.interceptors.request.use(
    config => {
      config.headers.common['Content-Type'] = 'application/json;charset=utf-8';
      return config;
    },
    error => Promise.reject(error)
  );

  return {
    get: url => instance.get(url),
    post: (url, payload, config = {}) => instance.post(url, payload, config),
    put: (url, payload) => instance.put(url, payload),
    patch: (url, payload, config = {}) => instance.patch(url, payload, config),
    delete: url => instance.delete(url),
  };
};
