import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  const { register, message } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isPasswordValid = (password) => {
    const minLength = /.{6,}/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const number = /[0-9]/;
    return (
      minLength.test(password) &&
      specialChar.test(password) &&
      number.test(password)
    );
  };

  const isUsernameValid = (username) => {
    // Must be alphabetic or alphanumeric, but not just numbers
    const validUsername = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    return validUsername.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUsernameValid(formData.username)) {
      setValidationError(
        "Username must start with a letter and contain only letters, numbers, or underscores."
      );
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setValidationError(
        "Password must be at least 6 characters and include a number and a special character."
      );
      return;
    }

    setValidationError("");
    await register(formData, navigate);
  };

  return (
    <div className="auth-form-register">
      <h1>Register</h1>

      {message && <p className="auth-error-register">{message}</p>}
      {validationError && (
        <p className="auth-error-register">{validationError}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-field-register">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-field-register">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-field-register">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" color="blue wide">
          Register
        </Button>
      </form>
    </div>
  );
}
