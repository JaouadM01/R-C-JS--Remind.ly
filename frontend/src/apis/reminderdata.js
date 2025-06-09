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

export const registerReminder = async (userId, reminder) => {
  const res = await api.post(`/Reminder?userId=${userId}`, reminder);
  return res.data;
};

export const fetchReminderStats = async (userId) => {
  const res = await api.get(`/Reminder/stats?userId=${userId}`);
  return res.data;
};