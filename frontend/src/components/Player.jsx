const Player = ({ song }) => {
  return (
    <div>
      <h2>Now Playing: {song.name}</h2>
      <audio controls autoPlay src={song.preview_url}></audio>
    </div>
  );
};

export default Player;
