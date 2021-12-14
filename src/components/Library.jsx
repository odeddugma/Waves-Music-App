// Import Components
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, audioRef }) => {
	return (
		<div className="library-container">
			<h2>Library</h2>
			<div className="library-songs-container">
				{songs.map((song) => (
					<LibrarySong
						key={song.id}
						song={song}
						songs={songs}
						setCurrentSong={setCurrentSong}
						audioRef={audioRef}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
