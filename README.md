# LitMood: Mood-Based Book Recommendation App 📚✨

![LitMood Preview](/frontend/src/assets/preview.png)

LitMood is an innovative book recommendation application that suggests reading material based on your current mood. Using advanced mood analysis and the Open Library API, it provides personalized book recommendations that match your emotional state.

## ✨ Features

- **Mood Analysis**: Advanced mood interpretation using natural language processing
- **Curated Recommendations**: Carefully balanced selection of both classic and contemporary books
- **Book Details**: Comprehensive information including covers, ratings, and publication years
- **Direct Links**: Easy access to full book information on Open Library
- **Social Sharing**: Share your mood-based recommendations with friends
- **Responsive Design**: Seamless experience across all devices

## 🛠️ Technology Stack

### Frontend

- React.js
- React Router for navigation
- CSS Modules for styling
- Lucide React for icons

### Backend

- Node.js
- Express.js
- Groq API for mood analysis
- Open Library API for book data

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Groq API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/litmood.git
cd mood-to-book
```

2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create a `.env` file in the backend directory:

```env
GROQ_API_KEY=your_groq_api_key
```

4. Start the development servers:

```bash
# Start backend server
cd backend
npm start

# In a new terminal, start frontend
cd frontend
npm run dev
```

5. Open http://localhost:5173 in your browser

## 🎨 Features in Detail

### Mood Analysis

- Natural language processing to understand user's emotional state
- Converts complex mood descriptions into targeted book recommendations

### Book Recommendations

- Balances between classic and contemporary literature
- Provides high-rated books matching the user's mood
- Includes cover images, author information, and ratings

### Social Features

- Share recommendations via native share functionality
- Connect with reading buddies through Instagram
- Create a community of mood-based readers

## 📱 Responsive Design

- Fully responsive layout
- Optimized for both desktop and mobile devices
- Smooth animations and transitions
- Intuitive user interface

## Deployed Version 🌐

- You can check out the deployed version of the app [here](https://litmood.vercel.app/) 📚
- Watch the walkthrough of the project on YouTube: [LitMood Demo](https://youtu.be/4mxHU3q4oS4?si=lQ_tUC0K-PFWXuCg) 🎥

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/MIT) file for details.

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for their comprehensive book API
- [Groq](https://groq.com/) for natural language processing capabilities
- [Lucide](https://lucide.dev/) for beautiful icons
- [Freesound](https://freesound.org/) for high-quality audio tracks

## 📬 Contact

Feel free to reach out for questions, suggestions, or just to share your reading experience 🤩!

- [Instagram](https://www.instagram.com/code_techhb/) | [LinkedIn](https://www.linkedin.com/in/houlaymatoub/)

---

Made with 📚 and ❤️ by [Houlaymatou B.](https://github.com/code-techhb) at the ColorStack Winter Break 2024 Hackathon
