import api from "./axios";

export const fetchProfile = async (userId) => {
  const res = await api.get(`/User/profile?userId=${userId}`);
  return res.data;
};