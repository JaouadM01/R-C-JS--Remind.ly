import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { fetchReminderThisMonth } from "../apis/reminderdata";
import "../css/CalendarPage.css"

const CalendarPage = () => {
    const { user } = useContext(UserContext);
    const [reminders, setReminders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const loadReminders = async () => {
            if (!user) return;
            const res = await fetchReminderThisMonth(user.id);
            setReminders(res);
        };
        loadReminders();
    }, [user]);

    const groupedReminders = reminders.reduce((acc, reminder) => {
        const day = new Date(reminder.date).getDate();
        if (!acc[day]) acc[day] = [];
        acc[day].push(reminder);
        return acc;
    }, {});

    const renderCalendar = () => {
        const year = 2025;
        const month = 5; // June
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();
        const cells = [];

        for (let i = 0; i < startDay; i++) {
            cells.push(<div className="calendar-cell empty" key={`empty-${i}`} />);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const hasReminder = groupedReminders[d];

            cells.push(
                <div
                    key={d}
                    className={`calendar-cell 
                        ${hasReminder ? "has-reminder" : ""}
                        ${selectedDate === d ? "selected-date" : ""}
                    `}
                    onClick={() => hasReminder && setSelectedDate(d)}
                >
                    <span>{d}</span>
                    {hasReminder && <div className="reminder-dot"></div>}
                </div>
            );
        }

        return <div className="calendar-grid">{cells}</div>;
    };

    return (
        <div className="calendar-container">
            <h2 className="calendar-header">📅 June 2025</h2>
            {renderCalendar()}

            {selectedDate && (
                <div className="reminder-panel">
                    <h3>🔔 Reminders for June {selectedDate}:</h3>
                    {groupedReminders[selectedDate].map((r, idx) => (
                        <div className="reminder-item" key={idx}>
                            <div className="reminder-item-title">{r.title}</div>
                            <div className="reminder-item-desc">{r.description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
