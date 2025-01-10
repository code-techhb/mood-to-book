import "./global.css";
import LandingPage from "./components/Landing/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoodSelection from "./components/MoodSelection/MoodSelection";

const App = () => {
  return (
    <Router>
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mood-selection" element={<MoodSelection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
