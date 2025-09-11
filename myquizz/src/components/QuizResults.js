import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaDownload, FaTimes } from "react-icons/fa";
import "./QuizResults.css";

const quizCompleteImg = "https://cdn-icons-png.flaticon.com/512/845/845646.png";

export default function QuizResult() {
  const { techName, score } = useParams();
  const decoded = decodeURIComponent(techName);
  const navigate = useNavigate();
  const numericScore = parseInt(score, 10);

  const [showForm, setShowForm] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [animateLevel, setAnimateLevel] = useState("");

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    if (numericScore <= 10) setAnimateLevel("low");
    else if (numericScore <= 20) setAnimateLevel("medium");
    else if (numericScore <= 30) setAnimateLevel("high");
    else setAnimateLevel("pro");
  }, [numericScore]);

  const youtubeLinks = {
    HTML: {
      low: "https://www.youtube.com/watch?v=qz0aGYrrlhU&t=1110s",
      mid: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
      high: "https://www.youtube.com/watch?v=l4Y2Aa6mJvk",
    },
    CSS: {
      low: "https://www.youtube.com/watch?v=0W6qz0-aDaM",
      mid: "https://www.youtube.com/watch?v=wRNinF7YQqQ",
      high: "https://www.youtube.com/watch?v=l4Y2Aa6mJvk&t=18s",
    },
    JavaScript: {
      low: "https://www.youtube.com/watch?v=PlbupGCBV6w",
      mid: "https://www.youtube.com/watch?v=uDwSnnhl1Ng",
      high: "https://www.youtube.com/watch?v=jSeI6OfifCI",
    },
    "React JS": {
      low: "https://www.youtube.com/watch?v=SqcY0GlETPk",
      mid: "https://www.youtube.com/watch?v=NV80nqwIIwM",
      high: "https://www.youtube.com/watch?v=01bEb7R-F4s",
    },
    Flutter: {
      low: "https://www.youtube.com/watch?v=5758jHtfBUM",
      mid: "https://www.youtube.com/watch?v=VOYZCc0F60Q",
      high: "https://www.youtube.com/watch?v=VCRIO0r64Xg",
    },
  };
  const API_BASE = "https://quiz.selfmade.express/api"; // update to your server origin in prod

  const saveCertificateToAdmin = async (sharedVia = []) => {
    const certificateData = {
      studentName,
      rollNo,
      technology: decoded,
      score: numericScore,
      date: currentDate,
      sharedVia,
    };
  }


  const getYouTubeLink = () => {
    const links = youtubeLinks[decoded];
    if (!links) return null;
    if (numericScore <= 20) return { level: "Beginner", url: links.low };
    if (numericScore <= 30) return { level: "Intermediate", url: links.mid };
    return { level: "Advanced", url: links.high };
  };

  const getFeedbackMessage = () => {
    if (numericScore <= 10) return "💡 Don't give up! Keep practicing!";
    if (numericScore <= 20) return "🚀 You're getting there! Keep learning!";
    if (numericScore <= 30) return "🎯 Great job! You're improving!";
    return "🏆 Excellent work! You're a pro!";
  };

  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const suggestion = getYouTubeLink();
  const videoId = suggestion ? extractVideoId(suggestion.url) : null;

  const downloadCertificate = () => {
    const doc = new jsPDF("landscape");
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, "F"); // White background

    // Add border
    doc.setDrawColor(218, 165, 32); // Gold
    doc.setLineWidth(4);
    doc.rect(10, 10, 277, 190);

    // Logo
    doc.addImage(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGbNxVLOK9qPXYd4Y9iY0KGnFC1u5WPsaidg&s",
      "PNG",
      135,
      15,
      30,
      30
    );

    // Heading
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.text("Certificate of Achievement", 148, 60, { align: "center" });

    // Subtitle
    doc.setFontSize(14);
    doc.text("This is proudly presented to", 148, 75, { align: "center" });

    // Name
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.text(studentName, 148, 90, { align: "center" });

    // Roll No
    doc.setFontSize(14);
    doc.text(`Roll No: ${rollNo}`, 148, 100, { align: "center" });

    // Main text
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(
      `For outstanding performance in the ${decoded} Technology Assessment, scoring ${score} / 40.`,
      148,
      115,
      { align: "center", maxWidth: 250 }
    );
    doc.text(
      `Your dedication, hard work, and exceptional performance demonstrate strong proficiency in ${decoded}.`,
      148,
      125,
      { align: "center", maxWidth: 250 }
    );

    // Footer
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Issued by: Vaagai Tech Academy", 50, 180);
    doc.text(`Date: ${currentDate}`, 230, 180);

    doc.save(`${studentName}-certificate.pdf`);
  };

  const shareWhatsApp = () => {
    const message = `🎓 Certificate of Achievement\n\nName: ${studentName}\nRoll No: ${rollNo}\nTechnology: ${decoded}\nScore: ${score}/40\nDate: ${currentDate}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const shareEmail = () => {
    const subject = "Certificate of Achievement";
    const body = `🎓 Certificate of Achievement\n\nName: ${studentName}\nRoll No: ${rollNo}\nTechnology: ${decoded}\nScore: ${score}/40\nDate: ${currentDate}`;
    const mailto = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const handleSubmit = async () => {
    if (studentName.trim() && rollNo.trim()) {
      setShowForm(false);
      setShowPreview(true);
      const token = localStorage.getItem("token");
      const certificateData = {
        studentName,
        rollNo,
        technology: decoded,
        score: numericScore,
        date: currentDate,
        sharedVia: [],
      };
      try {
        const res = await fetch(`${API_BASE}/certificates`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(certificateData),

        });


        if (!res.ok) throw new Error("Failed to save certificate");

        const saved = await res.json();
      } catch (err) {
        alert("Failed to save certificate to admin history.");
      }

    } else {
      alert("Please enter your name and roll number first.");
    }
  };

  const handleApply = () => {
    setShowPreview(false);
    setShowCertificate(true);
  };

  return (
    <div className="result-container">
      <motion.div
        className="result-layout"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* LEFT SIDE - QUIZ RESULT */}
        <motion.div
          className="left-panel"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className={`result-card glass-effect animate-${animateLevel}`}>
            <img
              src={quizCompleteImg}
              alt="Quiz Complete"
              className="result-image"
            />
            <h1 className="result-title">{decoded} Quiz Complete!</h1>
            <p className={`animated-score glow-${animateLevel}`}>
              Your final score: {score} / 40
            </p>
            <p className="feedback-text">{getFeedbackMessage()}</p>

            {numericScore > 2 && (
              <>
                {showForm && (
                  <div className="cert-inputs">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter Roll Number"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                    />
                    <button className="btn submit-btn" onClick={handleSubmit}>
                      ✅ Submit
                    </button>
                  </div>
                )}

                {showPreview && (
                  <motion.div
                    className="preview-box"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <p>
                      <strong>Name:</strong> {studentName}
                    </p>
                    <p>
                      <strong>Roll No:</strong> {rollNo}
                    </p>
                    <p>
                      <strong>Score:</strong> {score} / 40
                    </p>
                    <p className="preview-note">
                      ✅ Eligible for a Professional Certificate
                    </p>
                    <button className="apply-btn" onClick={handleApply}>
                      🎓 Apply for Certificate
                    </button>
                  </motion.div>
                )}
              </>
            )}
            {numericScore >= 25 && (
              <a
                href="https://www.mygreatlearning.com/computer/free-courses"
                target="_blank"
                rel="noopener noreferrer"
                className="cert-btn external"
                style={{
                  marginTop: "15px",
                  display: "block",
                  background: "#3b1b1bff",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "6px",
                }}
              >
                📜 Get Verified Free Certificate
              </a>
            )}

            <div className="btn-group">
              <button
                onClick={() => navigate(`/technology/${decoded}`)}
                className="btn retake animated-btn"
              >
                🔁 Retake Quiz
              </button>
              <button
                onClick={() => navigate("/technology ")}
                className="btn back animated-btn"
              >
                🧠 Back to Technologies
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - YOUTUBE VIDEO */}
        <motion.div
          className="right-panel"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {suggestion && videoId && (
            <div className="video-card glass-effect">
              <h3 className="video-title">
                🔗 Recommended {suggestion.level} Video
              </h3>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
                className="youtube-frame"
              />
              <a
                href={suggestion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link"
              >
                📺 Watch on YouTube
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* PROFESSIONAL CERTIFICATE POPUP */}
      {showCertificate && (
        <div className="certificate-overlay">
          <motion.div
            className="certificate-box zoomIn"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="cert-logo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGbNxVLOK9qPXYd4Y9iY0KGnFC1u5WPsaidg&s"
                alt="Academy Logo"
              />
            </div>
            <h1 className="cert-header">🏆 Certificate of Achievement</h1>
            <p className="cert-subtitle">Proudly Presented To</p>
            <h2 className="cert-name">{studentName}</h2>
            <p className="cert-roll">
              Roll No: <strong>{rollNo}</strong>
            </p>
            <div className="cert-content">
              <p>
                This certifies that <strong>{studentName}</strong> has
                successfully completed the{" "}
                <strong>{decoded} Technology Assessment</strong> with an
                outstanding score of <strong>{score} / 40</strong>.
              </p>
              <p>
                Your <mark>dedication</mark>, <mark>hard work</mark>, and
                <mark> exceptional performance</mark> demonstrate strong
                proficiency in the fundamentals of {decoded}.
              </p>
              <p>
                We <strong>congratulate</strong> you on this achievement and
                wish you continued success in your learning journey.
              </p>
            </div>
            <div className="cert-footer">
              <span>
                <strong>Issued by:</strong> Vaagai Tech Academy
              </span>
              <span>
                <strong>Date:</strong> {currentDate}
              </span>
            </div>
            <div className="cert-actions">
              <button
                onClick={() => {
                  downloadCertificate();
                  saveCertificateToAdmin(); // or saveCertificateToAdmin(["download"])
                }}
                className="cert-btn"
              >
                <FaDownload /> Download PDF
              </button>

              <button
                onClick={() => {
                  shareWhatsApp();
                  saveCertificateToAdmin(["whatsapp"]);
                }}
                className="cert-btn whatsapp"
              >
                <FaWhatsapp /> WhatsApp
              </button>

              <button
                onClick={() => {
                  shareEmail();
                  saveCertificateToAdmin(["email"]);
                }}
                className="cert-btn email"
              >
                <FaEnvelope /> Email
              </button>

              <button
                onClick={() => {
                  setShowCertificate(false);
                  saveCertificateToAdmin(["closed"]);
                }}
                className="cert-btn close"
              >
                <FaTimes /> Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
