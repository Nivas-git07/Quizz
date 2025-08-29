// components/Registration.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name, // backend expects username
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(" Registration successful!");
        
        setTimeout(() => navigate("/login"), 1000);
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(" Something went wrong. Try again.");
    }
  };


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_xNdRt2sDPf5vd8aUbid4uCKl8_6FItAf0Q&s"
          alt="Logo"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />

        <h2 style={styles.title}>Create an Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.note}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#1E2A78",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Log in instead
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0d0d0d", // Solid background (removed animation)
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)", // Softer glow effect
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#d4af37", // Gold title
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "14px",
    marginBottom: "16px",
    border: "1px solid #d4af37",
    borderRadius: "6px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#fff",
    outline: "none",
  },
  button: {
    padding: "14px",
    backgroundColor: "#d4af37",
    color: "#000",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  note: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#d4af37",
  },
};
