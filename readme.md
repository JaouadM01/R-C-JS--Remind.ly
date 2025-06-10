# Remind.ly 🧠

*Remind.ly* is a modern web-based reminder application built with React and C#. It helps users stay on top of important events, appointments, and tasks by providing a clear interface, personalized reminders, and visual tracking of memory performance.

## ✨ Features

- 🔐 User registration & login system
- 📝 Add, edit, and delete reminders
- 🗕️ Monthly calendar view
- 📈 Score tracking: mark reminders as "Remembered" or "Forgotten"
- 👤 User profile page with personal stats
- 📱 Responsive design for desktop and mobile
- ⚠️ Form validation using Zod + React Hook Form
- 🔔 Optional toast feedback messages after actions

## 💠 Tech Stack

| Layer      | Technology            |
| ---------- | --------------------- |
| Frontend   | React.js              |
| Backend    | C# (.NET)             |
| Database   | SQLite                |
| Validation | Zod + React Hook Form |
| Routing    | React Router          |

## 📂 Folder Structure (Frontend)

src/
├── apis/
├── components/
├── context/
├── css/
├── pages/
├── schemas/
└── utils/

yaml
Kopiëren
Bewerken

## 🧪 Coming Soon

- Email reminders / push notifications
- Reminder categories and labels
- Export/import reminders

## 🧑‍💻 Developer Notes

- All form inputs are validated with Zod before submission.
- React Hook Form is used for efficient state management in forms.
- The project prioritizes clean UI and UX, with minimal distractions.

---

## 🚀 Getting Started

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/remind.ly.git
Install frontend dependencies

bash
Kopiëren
Bewerken
cd remind.ly
npm install
Start the development server

bash
Kopiëren
Bewerken
npm run dev
Ensure your C# backend is running locally and connected to SQLite.
