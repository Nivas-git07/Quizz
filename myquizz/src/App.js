// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/splashscreen";
import Registration from "./Registration";
import Login from "./components/login";
import Technology from "./components/technology";
import TechnologyDetails from "./components/technologyDetails";
import Quiz from "./components/Quizz";
import ManagementPage from "./ManagementPage";
import AdminPage from "./components/AdminPage";
import QuizResult from "./components/QuizResults";
import AdminCertificates from "./components/AdminHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/manage" element={<ManagementPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/history" element={<AdminCertificates />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/technology/:techName" element={<TechnologyDetails />} />
        <Route path="/technology/:techName/quiz" element={<Quiz />} />
        <Route
          path="/technology/:techName/result/:score"
          element={<QuizResult />}
        />
      </Routes>
    </Router>
  );
}

export default App;
