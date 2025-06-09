import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { registerReminder } from "../apis/reminderdata";
import "../css/AddReminder.css"

const AddReminder = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            await registerReminder(user.id, { title, date, description });
            showToast("✅ Reminder added successfully!");
            setTimeout(() => navigate("/"), 2500);
        } catch (err) {
            console.error("Failed to add reminder", err);
            showToast("❌ Something went wrong. Try again.");
        }
    };

    return (
        <div className="add-reminder-page">
            <h2>Add New Reminder</h2>
            <form onSubmit={handleSubmit} className="add-reminder-form">
                <label>Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Dentist Appointment"
                />

                <label>Date</label>
                <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <label>Description (optional)</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Extra notes or location"
                />

                <button type="submit" className="submit-button">Save Reminder</button>
            </form>
            {toastMessage && (
                <div className="toast-message">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default AddReminder;