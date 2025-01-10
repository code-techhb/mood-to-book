import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Books.module.css";

const Books = () => {
  const { moodKeyword } = useParams();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
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
          throw new Error("Failed to get recommendations");
        }

        const data = await response.json();
        console.log("Received data:", data);

        setBooks(data.books);
      } catch (error) {
        setError("Failed to load book recommendations. Please try again.");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (moodKeyword) {
      fetchBooks();
    }
  }, [moodKeyword]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Finding the perfect books for your {moodKeyword} mood...
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Based on your {moodKeyword} mood...</h2>
      <div className={styles.booksGrid}>
        {books.map((book, index) => (
          <div key={index} className={styles.bookCard}>
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className={styles.bookCover}
            />
            <div className={styles.bookInfo}>
              <h3>{book.title}</h3>
              <p>By {book.author}</p>
              <p>Published: {book.year}</p>
              <p>Rating: {book.rating.toFixed(1)} ⭐️</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
