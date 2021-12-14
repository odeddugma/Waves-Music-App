// Import Components
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong }) => {
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
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
