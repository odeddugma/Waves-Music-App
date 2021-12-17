import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	songs,
}) => {
	// Events Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};
	const progressbarDragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
	const skipTrackHandler = (direction) => {
		let currentSongIndex = songs.findIndex(
			(song) => song.id === currentSong.id
		);
		if (direction === "skip-forward") {
			setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((currentSongIndex - 1) % songs.length === -1)
				setCurrentSong(songs[songs.length - 1]);
			else setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
		}
	};

	const getTime = (time) =>
		Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

	return (
		<div className="player-container">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					type="range"
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					onChange={progressbarDragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
					onClick={() => skipTrackHandler("skip-back")}
				/>
				<FontAwesomeIcon
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
					onClick={playSongHandler}
				/>
				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
					onClick={() => skipTrackHandler("skip-forward")}
				/>
			</div>
		</div>
	);
};

export default Player;
