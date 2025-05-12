import { useState } from "react";
import axios from "axios";

const LyricsDisplay = ({ song }) => {
  const [lyrics, setLyrics] = useState("");
  const [translatedLyrics, setTranslatedLyrics] = useState("");

  const fetchLyrics = async () => {
    if (!song || !song.name || !song.artists.length) return;

    const artistName = song.artists[0].name;

    try {
      const response = await axios.get(
        `http://localhost:8080/lyrics?artist=${encodeURIComponent(
          artistName
        )}&song=${encodeURIComponent(song.name)}`
      );
      setLyrics(response.data.lyrics);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setLyrics("Lyrics not found.");
    }
  };

  const fetchTranslatedLyrics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/translate?text=${encodeURIComponent(lyrics)}`
      );
      setTranslatedLyrics(response.data.translatedLyrics);
    } catch (error) {
      console.error("Error translating lyrics:", error);
      setTranslatedLyrics("Translation failed.");
    }
  };

  return (
    <div>
      <button onClick={fetchLyrics}>Show Lyrics</button>
      <button onClick={fetchTranslatedLyrics}>Translate to English</button>
      <p>
        <strong>Lyrics:</strong> {lyrics || "Click 'Show Lyrics' to fetch"}
      </p>
      <p>
        <strong>Translated:</strong>{" "}
        {translatedLyrics || "Click 'Translate to English'"}
      </p>
    </div>
  );
};

export default LyricsDisplay;
