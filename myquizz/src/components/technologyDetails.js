import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const techData = {
  HTML: {
    image: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    description:
      "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
  },
  CSS: {
    image: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    description:
      "CSS (Cascading Style Sheets) defines how HTML elements are displayed. It allows you to style and layout web pages.",
  },
  JavaScript: {
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    description:
      "JavaScript is a versatile programming language that enables interactive web pages. It runs on the client and server-side.",
  },
  "React JS": {
    image: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    description:
      "React is a JavaScript library for building fast and interactive user interfaces, maintained by Facebook.",
  },
  Flutter: {
    image:
      "https://th.bing.com/th/id/OIP.hdOrjwc9RGfCpvacm6s07gHaFM?w=259&h=182&c=7&r=0&o=7&pid=1.7&rm=3",
    description:
      "Flutter is a cross-platform UI toolkit by Google for building natively compiled applications for mobile, web, and desktop from a single codebase.",
  },
};

export default function TechnologyDetails() {
  const { techName } = useParams();
  const decoded = decodeURIComponent(techName);
  const navigate = useNavigate();
  const tech = techData[decoded];

  const startQuiz = () =>
    navigate(`/technology/${encodeURIComponent(decoded)}/quiz`);

  if (!tech) {
    return (
      <div style={styles.page}>
        <p style={styles.notFound}>
          No information available for <strong>{decoded}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(0,0,0,0.3)" }}
      >
        <motion.div
          style={styles.imageWrapper}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <img src={tech.image} alt={decoded} style={styles.image} />
        </motion.div>
        <div style={styles.content}>
          <motion.h1
            style={styles.title}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {decoded}
          </motion.h1>
          <motion.p
            style={styles.description}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {tech.description}
          </motion.p>
          <motion.button
            onClick={startQuiz}
            style={styles.button}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#FFD700",
              color: "#121212",
            }}
            transition={{ duration: 0.3 }}
          >
            Start Quiz (4 Rounds)
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('https://tse3.mm.bing.net/th/id/OIP.MFpQCIyq-Wt39zGSf1spJQHaEK?pid=Api&P=0&h=180')", // Solid background (removed animation)
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    maxWidth: "900px",
    width: "100%",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  imageWrapper: {
    flex: "0 0 40%",
    backgroundColor: "#F8F8F8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    maxWidth: "250px",
    objectFit: "contain",
  },
  content: {
    flex: "1",
    padding: "40px",
    backgroundColor: "#FFFFFF",
  },
  title: {
    margin: "0 0 16px",
    fontSize: "36px",
    color: "#121212",
    fontWeight: "700",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#333",
    marginBottom: "24px",
  },
  button: {
    display: "inline-block",
    padding: "14px 28px",
    backgroundColor: "#121212",
    color: "#FFD700",
    fontSize: "18px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  notFound: {
    fontSize: "20px",
    color: "#FFD700",
  },
};

