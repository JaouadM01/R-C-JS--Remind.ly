import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import ProfilePage from './pages/Profile'
import AddReminder from './pages/AddReminder'

function App() {
  return (
    <div style={{ paddingTop: '70px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<div>Calendar Page</div>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addreminder" element={<AddReminder />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
