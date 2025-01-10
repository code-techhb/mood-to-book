import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeMood } from "../../services/moodAnalyzer";
import styles from "./MoodSelection.module.css";

const MoodSelection = () => {
  const [mood, setMood] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const handleTextAreaChange = (e) => {
    setMood(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // Clear any previous errors when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim() || isAnalyzing) return;

    try {
      setIsAnalyzing(true);
      setError("");
      const moodKeyword = await analyzeMood(mood);
      navigate(`/books/${moodKeyword}`);
    } catch (error) {
      setError("Failed to analyze mood. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2>How are you feeling today?</h2>
      <p className={styles.subtitle}>
        Express yourself with words or emojis 📚✨
      </p>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={textareaRef}
            value={mood}
            onChange={handleTextAreaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="excited | 🎉 | peaceful | 🤓 |  or let your words flow as poetically as your heart feels......"
            className={`${styles.input} ${isFocused ? styles.focused : ""} ${
              isAnalyzing ? styles.analyzing : ""
            }`}
            rows={10}
            disabled={isAnalyzing}
          />
          {mood && <span className={styles.moodIndicator}>✍🏾</span>}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button
          type="submit"
          className={`${styles.button} ${mood ? styles.ready : ""} ${
            isAnalyzing ? styles.analyzing : ""
          }`}
          disabled={!mood.trim() || isAnalyzing}
        >
          {isAnalyzing ? "Reading your mood..." : "Find My Next Read"}
        </button>
      </form>
    </div>
  );
};

export default MoodSelection;
