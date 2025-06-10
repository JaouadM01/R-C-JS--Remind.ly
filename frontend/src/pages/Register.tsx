import { registerUser } from "../apis/auth";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../css/Register.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "../schemas/RegisterSchema";

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setSubmitError("");

    try {
      const response = await registerUser(data.email, data.password, data.name);
      if (response) {
        login(response);
        navigate("/");
      } else {
        setSubmitError("Unexpected response from server.");
      }
    } catch (err) {
      setSubmitError("Registration failed. " + (err?.response?.data || ""));
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;