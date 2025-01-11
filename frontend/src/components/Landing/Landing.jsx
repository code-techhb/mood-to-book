import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import pageFlipSound from "../../assets/page-turning-sound.wav";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [audio] = useState(new Audio(pageFlipSound));

  // Configure audio
  useEffect(() => {
    audio.preload = "auto";
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const handleNavigation = async () => {
    setIsAnimating(true);
    try {
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate("/mood-selection");
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.page} ${isAnimating ? styles.turning : ""}`}>
        <h1>LitMood</h1>
        <p>
          Feeling a vibe? Let LitMood turn your mood into the perfect read. Dive
          into stories that match your feelings, every single time.
        </p>
        <button onClick={handleNavigation} disabled={isAnimating}>
          Try Now 📚
        </button>
      </div>
      {isAnimating && <div className={styles.nextPage} />}
    </div>
  );
};

export default LandingPage;
