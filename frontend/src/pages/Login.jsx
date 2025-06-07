import { loginUser } from "../apis/auth";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(email, password);

      if (data) {
        login(data); // save user info (id, email, token?)
        console.log(data);
        navigate('/home');
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      setError('Invalid login credentials ', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;