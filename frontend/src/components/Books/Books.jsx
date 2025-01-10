import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Books.module.css";

const Books = () => {
  const { moodKeyword } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

        //raw response for debugging
        // console.log("Raw response:", response);

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
        {/* Add a loading spinner or animation here if desired */}
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
      <h2>Based on your {moodKeyword} mood...</h2>
      <div className={styles.booksGrid}>
        {books.length > 0 ? (
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
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noBooks}>
            <p>No books found for this mood.</p>
            <button
              onClick={() => navigate("/mood-selection")}
              className={styles.returnButton}
            >
              Try Another Mood
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
