import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Books.module.css";
import { ArrowLeft, Share2 } from "lucide-react";

const Books = () => {
  const { moodKeyword } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleShare = async () => {
    try {
      const baseUrl = window.location.origin;
      const shareData = {
        title: "✨ Join my LitMood Journey",
        text: `Hey! 📚 I just discovered some amazing book recommendations matching my ${moodKeyword} mood on LitMood. Want to explore together? ✨`,
        url: baseUrl,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard! Share your LitMood with friends ✨");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  useEffect(() => {
    if (!moodKeyword) {
      navigate("/");
      return;
    }

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        // console.log("Fetching books for mood:", moodKeyword);
        const response = await fetch(
          "http://localhost:5089/api/analyze-and-recommend",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mood: moodKeyword }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Backend error:", errorText);
          throw new Error(`Failed to get recommendations: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed response data:", data);

        if (!data.books || !Array.isArray(data.books)) {
          console.error("Invalid books data structure:", data);
          throw new Error("Invalid book data format received");
        }
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(`Failed to load book recommendations: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [moodKeyword, navigate]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h2>Finding the perfect books for your {moodKeyword} mood...</h2>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className={styles.returnButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <ArrowLeft size={24} />
        <span>Go Back</span>
      </button>
      <h2>Based on your {moodKeyword} mood...</h2>
      <div className={styles.booksGrid}>
        {books.length > 0 ? (
          (
            <p className={styles.description}>
              You will enjoy these readings ^^!{" "}
            </p>
          ) &&
          books.map((book, index) => (
            <div key={book.id || index} className={styles.bookCard}>
              <img
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className={styles.bookCover}
                onError={(e) => {
                  console.log(`Failed to load image for: ${book.title}`);
                  e.target.src = "/placeholder-book-cover.jpg";
                }}
              />
              <div className={styles.bookInfo}>
                <h3>{book.title}</h3>
                <p>By {book.author}</p>
                {book.year && <p>Published: {book.year}</p>}
                {book.rating && <p>Rating: {book.rating.toFixed(1)} ⭐️</p>}
                <a
                  href={book.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bookLink}
                >
                  <p className={styles.readMore}>Read more on Open Library →</p>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noBooks}>
            <p>No books found at this moment. Revise your Input and...</p>
            <button
              onClick={() => navigate("/mood-selection")}
              className={styles.returnButton}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      {books.length > 0 && (
        <div className={styles.shareSection}>
          <p className={styles.shareText}>
            Invite your Friends to share your <span>LitMood</span>?
          </p>
          <button onClick={handleShare} className={styles.shareButton}>
            <Share2 size={13} />
            Share Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default Books;
