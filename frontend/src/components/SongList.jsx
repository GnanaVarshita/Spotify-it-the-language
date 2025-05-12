const SongList = ({ songs, onSelect }) => {
  return (
    <ul>
      {songs.map((song) => (
        <li key={song.id} onClick={() => onSelect(song)}>
          {song.name} - {song.artists[0].name}
        </li>
      ))}
    </ul>
  );
};

export default SongList;
