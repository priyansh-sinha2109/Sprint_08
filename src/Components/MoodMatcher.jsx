import React, { useState } from "react";
import { BsStars } from "react-icons/bs";

const MoodMatcher = ({ onMoodResult }) => {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  // asks Gemini: "given this mood, give me one movie title"
  const handleMoodSearch = () => {
    if (mood.trim() === "" || loading) return;

    setLoading(true);

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${
        import.meta.env.VITE_GEMINI_KEY
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Based on this mood: "${mood}", suggest exactly one real movie title that fits. Reply with ONLY the movie title, nothing else, no quotes, no extra text.`,
                },
              ],
            },
          ],
        }),
      },
    )
      .then(async (res) => {
        const data = await res.json();

        console.log("Status:", res.status);
        console.log("Response:", data);

        if (!res.ok) {
          throw new Error(JSON.stringify(data, null, 2));
        }

        return data;
      })
      .then((data) => {
        const title = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        setLoading(false);

        if (title) {
          // this quietly passes the title into the normal TMDB search flow
          onMoodResult(title);
          setMood("");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
