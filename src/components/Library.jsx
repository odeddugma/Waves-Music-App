// Import Components
import LibrarySong from "./LibrarySong";

const Library = ({ songs }) => {
	return (
		<div className="library-container">
			<h2>Library</h2>
			<div className="library-songs-container">
				{songs.map((song) => (
					<LibrarySong key={song.id} song={song} />
				))}
			</div>
		</div>
	);
};

export default Library;
