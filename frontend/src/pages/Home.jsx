import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { fetchReminderThisMonth, updateReminderState } from "../apis/reminderdata";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaCalendarAlt,
  FaRegSmileBeam,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import ScoreWidget from "../components/ScoreWidget";


const Home = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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
      month: "short",
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
      <div className="greeting-container">
        <div className="greeting-text">
          <h1>Hello, {user?.name || "there"} 👋</h1>
          <p>Here are your reminders for this month:</p>
        </div>
      </div>

      {/* 📊 Score Widget Placement */}
      <div className="score-widget-container">
        <ScoreWidget userId={user?.id} />
      </div>
      
      <div className="add-reminder-container">
        <button className="add-reminder-button" onClick={() => navigate("/addreminder")}>
          <FaPlus style={{ marginRight: "0.5rem" }} />
          Add Reminder
        </button>
      </div>

      <div className="modern-card">
        <h2 className="modern-title">
          <FaCalendarAlt style={{ marginRight: "0.5rem", color: "#3b82f6" }} />
          Upcoming Reminders
        </h2>

        {data.length === 0 ? (
          <p className="empty-state">
            <FaRegSmileBeam style={{ marginRight: "0.5rem", color: "#10b981" }} />
            No reminders this month 🎉
          </p>
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
                  {item.status !== "Upcoming" && (
                    <div className="reminder-modern-desc">
                      {item.status === "Remembered" ? (
                        <FaCheckCircle style={{ color: "#22c55e", marginRight: "0.25rem" }} />
                      ) : (
                        <FaTimesCircle style={{ color: "#ef4444", marginRight: "0.25rem" }} />
                      )}
                      {item.status}
                    </div>
                  )}
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
                <FaTimesCircle style={{ marginRight: "0.3rem" }} />
                Forgot
              </button>
              <button className="btn-green" onClick={() => handleStatusUpdate("Remembered")}>
                <FaCheckCircle style={{ marginRight: "0.3rem" }} />
                Remembered
              </button>
            </div>
            <button className="popup-close" onClick={() => setSelectedReminder(null)}>
              ×
            </button>
          </div>
        </div>
      )}

      {toastMessage && <div className="toast-message">{toastMessage}</div>}
    </>
  );
};

export default Home;