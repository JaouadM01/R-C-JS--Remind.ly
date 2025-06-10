import { registerUser } from "../apis/auth";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../css/Register.css"

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await registerUser(email, password, name);
      if (data) {
        login(data); // login right after register
        console.log("Registered user:", data);
        navigate('/');
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError("Registration failed. " + (err?.response?.data || ""));
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;