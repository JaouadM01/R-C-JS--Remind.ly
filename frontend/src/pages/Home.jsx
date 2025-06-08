import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { fetchReminderThisMonth, updateReminderState } from "../apis/reminderdata";
import "../css/Home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // disappears after 3s
  };


  useEffect(() => {
    const getReminders = async () => {
      if (!user) return;
      try {
        const res = await fetchReminderThisMonth(user.id);
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };
    getReminders();
  }, [user]);

  const isToday = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    });
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedReminder) return;
    try {
      await updateReminderState(selectedReminder.id, status);
      setSelectedReminder(null);
      const updated = await fetchReminderThisMonth(user.id);
      setData(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="modern-card">
        <h2 className="modern-title">Upcoming Reminders</h2>

        {data.length === 0 ? (
          <p className="empty-state">No reminders this month 🎉</p>
        ) : (
          <ul className="reminder-modern-list">
            {data.map((item, index) => (
              <li
                key={index}
                className="reminder-modern-item"
                onClick={() => {
                  if (isToday(item.date)) {
                    setSelectedReminder(item);
                  } else {
                    showToast("You can only update reminders scheduled for today.");
                  }
                }}

              >
                <div className="reminder-date-badge">{formatDate(item.date)}</div>
                <div className="reminder-modern-content">
                  <div className="reminder-modern-title">{item.title}</div>
                  <div className="reminder-modern-desc">{item.description}</div>
                  {item.status != "Upcoming" ? <div className="reminder-modern-desc">{item.status}</div> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedReminder && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{selectedReminder.title}</h3>
            <p>{selectedReminder.description}</p>
            <div className="popup-buttons">
              <button className="btn-red" onClick={() => handleStatusUpdate("Forgotten")}>
                Forgot
              </button>
              <button className="btn-green" onClick={() => handleStatusUpdate("Remembered")}>
                Remembered
              </button>
            </div>
            <button className="popup-close" onClick={() => setSelectedReminder(null)}>
              ×
            </button>
          </div>
        </div>
      )}
      {toastMessage && (
        <div className="toast-message">
          {toastMessage}
        </div>
      )}

    </>
  );
};

export default Home;