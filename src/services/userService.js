import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/users', 
});

export function getAllUsers() {
  return api.get('/');
}

export function createUser(data) {
  return api.post('/', data);
}

export function updateUser(id, data) {
  return api.put(`/${id}`, data);
}

export function deleteUser(id) {
  return api.delete(`/${id}`);
}

