import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div style={{ paddingTop: '70px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<div>Calendar Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
