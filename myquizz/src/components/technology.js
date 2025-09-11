import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Technology() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState(null);
  const navigate = useNavigate();

  const technologies = [
    {
      name: "HTML",
      image: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    },
    {
      name: "CSS",
      image: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    },
    {
      name: "JavaScript",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    },
    {
      name: "React JS",
      image: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    },
    {
      name: "Flutter",
      image:
        "https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_flutter_icon_130599.png",
    },
  ];

  const techDescriptions = {
    HTML: "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
    CSS: "CSS (Cascading Style Sheets) is used to style and layout web pages — including colors, fonts, and spacing.",
    JavaScript:
      "JavaScript is a scripting language that enables interactive web features such as sliders, forms, and animations.",
    "React JS":
      "React is a JavaScript library for building fast and interactive user interfaces developed by Facebook.",
    Flutter:
      "Flutter is an open-source UI framework by Google for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
  };

  const filteredTech = searchTerm
    ? technologies.filter((tech) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : technologies;

  const handleCardClick = (techName) => {
    setSelectedTech(techName);

    setTimeout(() => {
      navigate(`/technology/${encodeURIComponent(techName)}`);
    }, 700); // Smooth transition before navigation
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Technology Explorer</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />

        {/* Tech Cards */}
        <div style={styles.techList}>
          {filteredTech.length > 0 ? (
            filteredTech.map((tech, index) => (
              <motion.div
                key={index}
                style={styles.card}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCardClick(tech.name)}
              >
                <motion.img
                  src={tech.image}
                  alt={tech.name}
                  style={styles.image}
                  whileHover={{ rotate: 8 }}
                  transition={{ duration: 0.3 }}
                />
                <p style={styles.cardText}>{tech.name}</p>
              </motion.div>
            ))
          ) : (
            <p style={styles.noResult}>No technology found.</p>
          )}
        </div>

        {/* Description with Animation */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              style={styles.descriptionBox}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={styles.exampleTitle}>📘 {selectedTech} Overview</h2>
              <p style={styles.exampleText}>{techDescriptions[selectedTech]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        style={styles.backButton}
        onClick={() => navigate("/login")}
      >
        ← Back
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('https://img.freepik.com/free-vector/wave-background-abstract-gradient-design_483537-3688.jpg')", // Solid background (removed animation)
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  container: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    maxWidth: "1000px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "36px",
    fontWeight: "700",
    color: "#111111", // Black text
  },
  search: {
    padding: "14px",
    fontSize: "16px",
    width: "100%",
    marginBottom: "30px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  techList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#FFD700", // Dark Yellow
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
    color: "#111", // Black text for contrast
  },
  cardText: {
    color: "#111",
    fontSize: "18px",
    fontWeight: "700",
    marginTop: "10px",
  },
  image: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
  },
  noResult: {
    gridColumn: "1 / -1",
    color: "#888",
    fontSize: "16px",
  },
  descriptionBox: {
    marginTop: "10px",
    backgroundColor: "#fdf6e3", // Light yellow background
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e0c080",
    textAlign: "left",
  },
  exampleTitle: {
    color: "#b58900", // Dark yellow shade
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  exampleText: {
    fontSize: "16px",
    color: "#333",
  },
  backButton: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    backgroundColor: "#1E3A8A", // dark blue background
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    display: "flex",
  },


};
