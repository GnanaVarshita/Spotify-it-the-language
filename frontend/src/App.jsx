import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import LyricsDisplay from "./components/LyricsDisplay";
import { searchSongs } from "./utils/apiService";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSearch = async (query) => {
    const results = await searchSongs(query);
    setSongs(results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SongList songs={songs} onSelect={setSelectedSong} />
      <Player song={selectedSong} />
      {selectedSong && <LyricsDisplay song={selectedSong} />}
    </div>
  );
};

export default App;
