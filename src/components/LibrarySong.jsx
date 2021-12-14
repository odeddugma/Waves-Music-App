const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying }) => {
	const { cover, name, artist } = song;

	// Events Handlers
	const songSelectHandler = () => {
		setCurrentSong(song);
		// Check if the song is playing
		if (isPlaying) {
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.then(() => audioRef.current.play());
			}
		}
	};

	return (
		<div className="library-song-container" onClick={songSelectHandler}>
			<img src={cover} alt={name} />
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
