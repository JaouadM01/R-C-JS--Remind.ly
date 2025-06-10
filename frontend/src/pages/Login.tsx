import { loginUser } from "../apis/auth";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import "../css/Login.css"
import { LoginSchema , LoginSchemaType} from "../schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm < LoginSchemaType > ({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setSubmitError("");

    try {
      const response = await loginUser(data.email, data.password);
      if (response) {
        login(response);
        navigate("/");
      } else {
        setSubmitError("Unexpected response from server");
      }
    } catch {
      setSubmitError("Invalid login credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className="error-text">{errors.password.message}</p>}

        {submitError && <p className="error-text">{submitError}</p>}

        <button type="submit">Log In</button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;