import "./global.css";
import LandingPage from "./components/Landing/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoodSelection from "./components/MoodSelection/MoodSelection";
import Books from "./components/Books/Books";
import { GoogleAnalytics } from "./components/analytics";

const App = () => {
  return (
    <Router>
      <GoogleAnalytics />
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mood-selection" element={<MoodSelection />} />
          <Route path="/books/:moodKeyword" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
