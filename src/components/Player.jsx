import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
	const { audio } = currentSong;
	// Ref
	const audioRef = useRef(null);

	// Events Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};
	const timeUpdateHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime, duration });
		console.log(songInfo);
	};
	const getTime = (time) =>
		Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

	// State
	const [songInfo, setSongInfo] = useState({
		currentTime: null,
		duration: null,
	});

	return (
		<div className="player-container">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input type="range" />
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon
					className="play"
					size="2x"
					icon={faPlay}
					onClick={playSongHandler}
				/>
				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
			<audio
				src={audio}
				ref={audioRef}
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
			/>
		</div>
	);
};

export default Player;
