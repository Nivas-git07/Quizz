import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
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

     let token = null;
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      token = data.token; 
      localStorage.setItem("token", token); 
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }




      navigate("/technology");
    } catch (err) {
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

        <h2 style={styles.title}>Welcome Back</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
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
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E6B800")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#d4af37")}
          >
            Log In
          </button>
        </form>
        <p style={styles.note}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#1E2A78",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register now
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
    backgroundImage: "url('https://media.istockphoto.com/id/2197300065/photo/abstract-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=njbnHMPd8i2u3wil2MBq65kzL9s_LUf1V4TGq6lYWUQ=')", // Solid background (removed animation)
    backgroundSize: "cover",
    backgroundPosition: "center", // Matches registration page
  },
  card: {
    backgroundImage: "url('https://wallpapercave.com/wp/wp3416333.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)", // Gold shadow like registration
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
