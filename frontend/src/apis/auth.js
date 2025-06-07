import api from "./axios";

export const loginUser = async (email, password) => {
  const res = await api.post('/User/login', { email, password });
  return res.data;
};
