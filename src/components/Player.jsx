import { useEffect } from "react";
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
	setSongs,
}) => {
	// UseEffect
	useEffect(() => {
		const newSongs = songs.map((el) => {
			if (el.id === currentSong.id) return { ...el, active: true };
			else return { ...el, active: false };
		});
		setSongs(newSongs);
	}, [currentSong]);

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
	const skipTrackHandler = async (direction) => {
		let currentSongIndex = songs.findIndex(
			(song) => song.id === currentSong.id
		);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((currentSongIndex - 1) % songs.length === -1)
				await setCurrentSong(songs[songs.length - 1]);
			else await setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	// Add styles
	const trackAnimation = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};
	const background = {
		background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]}`,
	};

	const getTime = (time) =>
		Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

	return (
		<div className="player-container">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div className="track" style={background}>
					{/* Accessibility */}
					<label htmlFor="scrollbar"></label>
					<input
						type="range"
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						onChange={progressbarDragHandler}
						id="scrollbar"
					/>
					<div className="animate-track" style={trackAnimation}></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
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
