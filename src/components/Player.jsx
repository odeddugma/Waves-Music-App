import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong }) => {
	const { audio } = currentSong;
	// Ref
	const audioRef = useRef(null);

	// Events Handlers
	const playSongHandler = () => {
		console.log(audioRef.current);
	};

	return (
		<div className="player-container">
			<div className="time-control">
				<p>Start time</p>
				<input type="range" />
				<p>End time</p>
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
			<audio src={audio} ref={audioRef} />
		</div>
	);
};

export default Player;
