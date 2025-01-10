import "./global.css";
import LandingPage from "./components/Landing/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoodSelection from "./components/MoodSelection/MoodSelection";
import Books from "./components/Books/Books";

const App = () => {
  return (
    <Router>
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mood-selection" element={<MoodSelection />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
