import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import ProfilePage from './pages/Profile'
import AddReminder from './pages/AddReminder'
import CalendarPage from './pages/CalendarPage'
import Register from './pages/Register'

function App() {
  return (
    <div style={{ paddingTop: '64px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addreminder" element={<AddReminder />} />
        <Route path='/register' element={<Register />}/>
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
