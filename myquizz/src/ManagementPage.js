import React from "react";
import { useNavigate } from "react-router-dom";

export default function ManagementPage() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/register");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const pageStyle = {
    backgroundImage: "url('https://img.freepik.com/premium-photo/educational-concept-books-blue_387680-275.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "#fff",
  };

  const buttonStyle = {
    padding: "15px 30px",
    margin: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    transition: "0.3s",
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ marginBottom: "30px" }}>Management</h1>
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#007bff")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(0,0,0,0.6)")}
        onClick={handleUserClick}
      >
        User
      </button>
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#28a745")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(0,0,0,0.6)")}
        onClick={handleAdminClick}
      >
        Admin
      </button>
    </div>
  );
}
