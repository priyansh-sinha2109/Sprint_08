# 🎬 MirrorFlix

MirrorFlix is a Netflix-inspired movie browsing application built with **React** and **Tailwind CSS**. It allows users to explore movies, search titles dynamically using the TMDB API, and enjoy a responsive streaming-style interface with smooth animations and infinite scrolling.

---

## 🚀 Features

### 🎥 Hero Billboard
- Displays a randomly selected upcoming movie.
- Automatically fetches trailer from TMDB.
- Plays trailer on desktop after a short delay.
- Falls back to backdrop image on mobile devices.

### 🔥 Movie Categories
- Now Playing
- Popular
- Top Rated
- Upcoming

Each category is fetched dynamically from TMDB.

### 🔍 Search
- Real-time movie search.
- Debounced API requests.
- Displays search results in a responsive CSS Grid.
- Infinite scrolling for additional results.
- Close search panel functionality.

### 🎞 Movie Cards
- Responsive Netflix-style movie cards.
- Hover animations.
- Movie poster
- Movie title
- Release year
- Rating

### ❤️ Favorites
- Add movies to favourites.
- Local storage persistence.

### 📱 Responsive Design
- Desktop navigation.
- Mobile navigation menu.
- Responsive layouts across devices.

---

## 🛠 Tech Stack

- React
- Tailwind CSS
- Vite
- TMDB API
- Swiper.js
- React Icons

---

## 📂 Project Structure

```
src/
│
├── Components/
│   ├── BillBoard.jsx
│   ├── MovieCard.jsx
│   ├── MovieRow.jsx
│   ├── SearchResults.jsx
│   ├── NavBar.jsx
│   ├── Footer.jsx
│   └── MoodMatcher.jsx
│
├── Data/
│   └── options.js
│
├── Pages/
│   └── Home.jsx
│
├── Utils/
│   ├── debounce.js
│   └── favourite.js
│
└── App.jsx
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd sprint_8
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```
VITE_TMDB_TOKEN=your_tmdb_bearer_token
VITE_GEMINI_KEY=your_gemini_api_key
```

> **Note:** Never commit your `.env` file or API keys to GitHub.

---


## 🎯 Learning Outcomes

This project helped strengthen understanding of:

- React Components
- Props
- State Management
- React Hooks
- API Integration
- Infinite Scrolling
- Debouncing
- Responsive UI Design
- Tailwind CSS
- Conditional Rendering
- Local Storage

---
