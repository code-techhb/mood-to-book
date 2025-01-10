const express = require("express");
const cors = require("cors");
const { Groq } = require("groq-sdk");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper function to clean Groq response
function cleanMoodKeyword(response) {
  const firstLine = response.split("\n")[0];
  const firstWord = firstLine.split(" ")[0];
  return firstWord.replace(/[^a-zA-Z]/g, "").toLowerCase();
}

// mood + book rec
app.post("/api/analyze-and-recommend", async (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const prompt = `As a mood analyzer for a book recommendation system, analyze the following user input and return a SINGLE keyword that best captures the emotional essence. The keyword should be suitable for finding books that match this mood.
    
    User's mood: "${mood}"
    
    Very IMPORTANT: Return only the single keyword that captures the emotions, nothing else. For example, if someone says they're "feeling on top of the world", you might return "triumphant". If they say "feeling down and lonely", you might return "melancholic". If they write something poetic like "The gentle hush of the evening envelops her like a soft embrace. The warm glow of twilight paints the horizon in hues of lavender and gold, casting a calmness over the world. Her mind is quiet, free of the day's worries, as a light breeze carries the scent of blooming jasmine. In this tranquil moment, she feels at peace, as though time itself has slowed to let her savor the harmony within and around her", you might return "Serene". Do NOT add any comments about the word! `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: 0.3,
      max_tokens: 10,
    });

    const rawResponse = completion.choices[0]?.message?.content?.trim() || "";
    const cleanedKeyword = cleanMoodKeyword(rawResponse);

    // console.log("Raw Groq response:", rawResponse);
    // console.log("Cleaned keyword:", cleanedKeyword);

    const books = await searchBooks(cleanedKeyword);

    res.json({
      mood: cleanedKeyword,
      books: books,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to analyze mood and find books" });
  }
});

async function searchBooks(keyword) {
  try {
    const searchQuery = `${keyword} fiction`;
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        searchQuery
      )}&fields=key,title,author_name,first_publish_year,ratings_average,cover_i&limit=10`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Open Library");
    }

    const data = await response.json();

    const processedBooks = data.docs
      .filter(
        (book) =>
          book.title && book.author_name && book.cover_i && book.ratings_average
      )
      .map((book) => ({
        title: book.title,
        author: book.author_name[0],
        year: book.first_publish_year,
        rating: book.ratings_average,
        coverId: book.cover_i,
        coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
      }))
      .sort((a, b) => b.rating - a.rating);

    return processedBooks.slice(0, 2);
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
}

const PORT = process.env.PORT || 5089;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
