import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Login.css";
import Button from "../../components/Button/Button";

export default function LoginPage() {
  const { login, message } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, navigate);
  };

  return (
    <div className="auth-form-login">
      <h1>Login</h1>
      {message && <p className="auth-error-login">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-field-login">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-field-login">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" color="blue wide">
          Login
        </Button>
      </form>
    </div>
  );
}
