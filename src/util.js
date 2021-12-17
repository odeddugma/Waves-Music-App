export const playAudio = (isPlaying, audioRef) => {
	// Check if the song is playing
	if (isPlaying) {
		const playPromise = audioRef.current.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					audioRef.current.play();
				})
				.catch((e) => console.log(e));
		}
	}
};
