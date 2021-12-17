import { playAudio } from "../util";

const LibrarySong = ({
	song,
	songs,
	setSongs,
	setCurrentSong,
	audioRef,
	isPlaying,
}) => {
	const { cover, name, artist } = song;

	// Events Handlers
	const songSelectHandler = () => {
		setCurrentSong(song);
		// Add active state
		const newSongs = songs.map((el) => {
			if (el.id === song.id) return { ...el, active: true };
			else return { ...el, active: false };
		});
		setSongs(newSongs);
		playAudio(isPlaying, audioRef);
	};

	return (
		<div
			className={`library-song-container ${song.active ? "selected-song" : ""}`}
			onClick={songSelectHandler}
		>
			<img src={cover} alt={name} />
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
