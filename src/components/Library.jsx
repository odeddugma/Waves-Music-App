// Import Components
import LibrarySong from "./LibrarySong";

const Library = ({
	songs,
	setSongs,
	setCurrentSong,
	audioRef,
	isPlaying,
	libraryStatus,
}) => {
	return (
		<div
			className={`library-container ${libraryStatus ? "active-library" : ""}`}
		>
			<h2>Library</h2>
			<div className="library-songs-container">
				{songs.map((song) => (
					<LibrarySong
						key={song.id}
						song={song}
						songs={songs}
						setSongs={setSongs}
						setCurrentSong={setCurrentSong}
						audioRef={audioRef}
						isPlaying={isPlaying}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
