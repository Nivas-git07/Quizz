import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ React Router hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      alert("Login Successful!");
      navigate("/history"); // ✅ Redirect to history page
    } else {
      alert("Invalid Credentials");
    }
  };

  const pageStyle = {
    backgroundImage:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfunNPqCsNDpKxQWlpywlt_61cqPUwZr9JRw&s')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    backgroundImage: "url('https://wallpapercave.com/wp/wp3416333.jpg')", // Solid background (removed animation)
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)", // Softer glow effect
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    color: "#fff",
  };

  const logoStyle = {
    width: "100px",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjfwuvplZG8DogufYnsjNl3xKE4j6Rld3RvA&s"
          alt="Admin Logo"
          style={logoStyle}
        />
        <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
