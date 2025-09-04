import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   try {
  //     const { data } = await axios.post("https://gym-backend.onrender.com/user/register", formData);
  //     console.log("data: ", data);
  //     navigate("/login"); // Redirect to Login page after successful signup
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting signup form with:", formData);

  try {
    const { data } = await axios.post(
      "https://gym-backend.onrender.com/user/register",
      formData
    );

    console.log("Response:", data);

    if (data.success) {
      alert("Signup successful! Please login.");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Signup failed. Please try again.");
  }
};

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <p>Already Have an Account ? <a href="/login">Login</a></p>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
