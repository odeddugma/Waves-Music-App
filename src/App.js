import { useState, useRef } from "react";
// Import Styles
import "./styles/app.scss";
// Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Import Utils
import songsList from "./songsList";

function App() {
	// State
	const [songs, setSongs] = useState(songsList());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 100,
		animationPercentage: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);
	// Ref
	const audioRef = useRef(null);
	// Events Handlers
	const timeUpdateHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		// Calculate percentage
		const roundedCurrentTime = Math.ceil(currentTime);
		const roundedDuration = Math.ceil(duration);
		const calcAnimationPercentage = Math.ceil(
			(roundedCurrentTime / roundedDuration) * 100
		);
		setSongInfo({
			...songInfo,
			currentTime,
			duration,
			animationPercentage: calcAnimationPercentage,
		});
	};
	const songEndHandler = async () => {
		let currentSongIndex = songs.findIndex(
			(song) => song.id === currentSong.id
		);
		await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};

	return (
		<div className={`App ${libraryStatus ? "library-active" : ""}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				audioRef={audioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setSongs={setSongs}
			/>
			<Library
				songs={songs}
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
				libraryStatus={libraryStatus}
			/>
			<audio
				src={currentSong.audio}
				ref={audioRef}
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				onEnded={songEndHandler}
			/>
		</div>
	);
}

export default App;
