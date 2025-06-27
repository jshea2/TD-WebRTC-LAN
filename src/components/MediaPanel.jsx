import { useEffect } from "react";

function MediaPanel({ fullscreen }) {
	const wrapperStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black",
		margin: 0,
		padding: 0,
		overflow: "hidden",
	};


	const videoStyle = {
		width: "100%",
		height: "100%",
		objectFit: "contain",
		transform: "scaleX(-1)",
	};

	function isMobile() {
		return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
	}

	useEffect(() => {
		const video = document.getElementById("remoteVideo");

		const applyTransform = () => {
			if (!video) return;

			const isFull = document.fullscreenElement || document.webkitFullscreenElement;

			if (isMobile()) {
				// iPhone fix: only flip in fullscreen
				video.style.setProperty("transform", isFull ? "scaleX(-1)" : "none", "important");
				console.log("This is mobile")
			} else {
				// Desktop: only flip in preview, not fullscreen
				console.log("This is NOT mobile")
				video.style.setProperty("transform", isFull ? "scaleX(-1)" : "none", "important");
			}
		};

		applyTransform();

		document.addEventListener("fullscreenchange", applyTransform);
		document.addEventListener("webkitfullscreenchange", applyTransform);

		return () => {
			document.removeEventListener("fullscreenchange", applyTransform);
			document.removeEventListener("webkitfullscreenchange", applyTransform);
		};
	}, []);


	return (
		<div style={wrapperStyle}>
			<video
				id="remoteVideo"
				autoPlay
				playsInline
				muted={false}
				style={videoStyle}
			/>
		</div>
	);
}

export default MediaPanel;
