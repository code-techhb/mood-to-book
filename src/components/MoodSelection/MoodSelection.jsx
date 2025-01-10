import { useState, useRef, useEffect } from "react";
import styles from "./MoodSelection.module.css";

const MoodSelection = () => {
  const [mood, setMood] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleTextAreaChange = (e) => {
    setMood(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
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

      <form
        className={styles.formContainer}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.inputWrapper}>
          <textarea
            ref={textareaRef}
            value={mood}
            onChange={handleTextAreaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="excited 🎉 | nostalgic | 🦋 | peaceful or let your words flow as poetically as your heart feels......"
            className={`${styles.input} ${isFocused ? styles.focused : ""}`}
            rows={10}
          />
          {mood && <span className={styles.moodIndicator}>✍🏾</span>}
        </div>

        <button
          type="submit"
          className={`${styles.button} ${mood ? styles.ready : ""}`}
        >
          Find My Next Read
        </button>
      </form>
    </div>
  );
};

export default MoodSelection;
