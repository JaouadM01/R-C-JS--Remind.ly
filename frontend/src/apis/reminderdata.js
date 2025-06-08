import api from "./axios";

export const fetchReminderThisMonth = async (userId) => {
  const res = await api.get(`/Reminder/thismonth?userId=${userId}`);
  return res.data;
};

export const updateReminderState = async (reminderId, newStatus) => {
  const res = await api.put(`/Reminder/status`, null, {
    params: {
      reminderId: reminderId,
      newStatus: newStatus
    }
  });
  return res.data;
};
