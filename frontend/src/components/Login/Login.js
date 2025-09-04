import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
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
  //     const { data } = await axios.post(
  //       "http://localhost:8080/user/login",
  //       formData
  //     );
  //     if(data.success){
  //     console.log("data: ", data);
  //     navigate("/home"); // Redirect to Home page after successful login
  //     }
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting login form with:", formData);
  try {
    const { data } = await axios.post("https://gym-backend.onrender.com/user/login", formData);

    console.log("Response:", data);
    if (data.success) {
      console.log("Success detected, navigating to /Home");
      navigate("/home");
      // 
      console.log("Navigation attempted");
    }
  } catch (error) {
   alert("Login error:", error);
  }
};


  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <p>Don't Have an Account? <a href="/signup">Sign Up</a></p>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
