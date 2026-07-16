import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_KEY,
});

const MoodMatcher = ({ onMoodResult }) => {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  // asks Gemini: "given this mood, give me one movie title"
  const handleMoodSearch = async () => {
    if (mood.trim() === "" || loading) return;

    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `Based on this mood: "${mood}", suggest exactly one real movie title that fits. Reply with ONLY the movie title, nothing else, no quotes, no extra text.`,
      });

      const title = response.text?.trim();

      if (title) {
        // this quietly passes the title into the normal TMDB search flow
        onMoodResult(title);
        setMood("");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMoodSearch();
    }
  };

  return (
    <div className="flex flex-row items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1">
      <BsStars className="text-red-500 text-lg" />
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder="How are you feeling today?"
        className="bg-transparent text-white text-sm outline-none w-40 md:w-56 disabled:opacity-50"
      />
      <button
        onClick={handleMoodSearch}
        disabled={loading}
        className="text-white text-xs bg-red-600 px-2 py-1 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "..." : "Match"}
      </button>
    </div>
  );
};

export default MoodMatcher;
