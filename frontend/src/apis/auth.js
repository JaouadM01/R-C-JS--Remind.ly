import api from "./axios";

export const loginUser = async (email, password) => {
  const res = await api.post('/User/login', { email, password });
  return res.data;
};

export const registerUser = async (email, password, name) => {
  const res = await api.post('/User/register', { email, password, name });
  return res.data;
};