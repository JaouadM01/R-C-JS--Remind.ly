import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { registerReminder } from "../apis/reminderdata";
import "../css/AddReminder.css"

import { ReminderSchema, ReminderSchemaType  } from "../schemas/ReminderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddReminder = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReminderSchemaType>({
    resolver: zodResolver(ReminderSchema),
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const onSubmit = async (data: ReminderSchemaType) => {
    if (!user) return;

    try {
      await registerReminder(user.id, data);
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
      <form onSubmit={handleSubmit(onSubmit)} className="add-reminder-form">
        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Dentist Appointment"
          {...register("title")}
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}

        <label>Date</label>
        <input
          type="date"
          {...register("date")}
        />
        {errors.date && <p className="error-text">{errors.date.message}</p>}

        <label>Description (optional)</label>
        <textarea
          placeholder="Extra notes or location"
          {...register("description")}
        />
        {errors.description && <p className="error-text">{errors.description.message}</p>}

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