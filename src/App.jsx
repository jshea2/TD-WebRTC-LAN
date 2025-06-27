import { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import SignalingClientPanel from "./components/SignalingClientPanel";
import MediaPanel from "./components/MediaPanel";

import WebRTCConnection from "./utils/webRTCConnection";
import SignalingClient from "./utils/signalingClient";

import './App.css';

function App() {
	const queryParams = new URLSearchParams(window.location.search);
	const defaultPort = parseInt(queryParams.get("port")) || 450;
	const params = new URLSearchParams(window.location.search);
	const autoStart = params.get("autostart");
	console.log(autoStart)

	const [port, setPort] = useState(defaultPort);
	const [address, setAddress] = useState(`ws://${window.location.hostname}`);
	const [webSocketClients, setWebSocketClients] = useState([]);
	const [connectedToServer, setConnectedToServer] = useState(false);
	const [mouseDataChannel, setMouseDataChannel] = useState();
	const [keyboardDataChannel, setKeyboardDataChannel] = useState();
	const [signalingClient, setSignalingClient] = useState();
	const [webRTCConnection, setWebRTCConnection] = useState();
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		let signalingClient = new SignalingClient(
			address,
			port,
			setWebSocketClients,
			setConnectedToServer
		);
		let webRTCConnection = new WebRTCConnection(
			signalingClient,
			setMouseDataChannel,
			setKeyboardDataChannel
		);
		setSignalingClient(signalingClient);
		setWebRTCConnection(webRTCConnection);

		return () => signalingClient.close();
	}, [address, port]);

	const autoStartTriggered = useRef(false);

	useEffect(() => {

		if (autoStart === "true") {
			console.log("autostartttt")
		}
		if (
			autoStart === "true" &&
			webSocketClients.length > 0 &&
			webRTCConnection &&
			signalingClient &&
			!autoStartTriggered.current
		) {
			const firstClient = webSocketClients.find(c => c.id !== signalingClient.id); // don't call yourself

			if (firstClient?.address && firstClient?.properties) {
				console.log("✅ Auto-starting call with:", firstClient.address);
				webRTCConnection.onCallStart(firstClient.address, firstClient.properties);
				autoStartTriggered.current = true;
			}
			setTimeout(() => {
				//handleFullscreen();
			}, 500);
		}
	}, [webSocketClients, webRTCConnection, signalingClient]);


	const handleFullscreen = () => {
		const container = document.getElementById("fullscreenArea");
		const video = document.getElementById("remoteVideo");

		if (container?.requestFullscreen) {
			container.requestFullscreen().then(() => {
				setIsFullscreen(true);
			});
		} else if (video?.webkitEnterFullscreen) {
			video.webkitEnterFullscreen();
			setIsFullscreen(true);
		}
	};

	useEffect(() => {
		const exitHandler = () => {
			if (!document.fullscreenElement) {
				setIsFullscreen(false);
			}
		};
		document.addEventListener("fullscreenchange", exitHandler);
		return () => document.removeEventListener("fullscreenchange", exitHandler);
	}, []);

	const handlePortChange = (newPort) => {
		setPort(newPort);

		// Update the URL to reflect the new port
		const url = new URL(window.location);
		url.searchParams.set("port", newPort);
		window.history.replaceState({}, "", url);
	};

	const handleAutoStart = () => {
		const url = new URL(window.location);
		url.searchParams.set("autostart", "true");

		const currentPort = url.searchParams.get("port");
		if (currentPort) {
			url.searchParams.set("port", currentPort);
		}

		window.history.replaceState({}, "", url);
		window.location.reload();
	};




	return (
		<Container id="tdApp" maxWidth={false} disableGutters>
			<CssBaseline />
			{!autoStart && !isFullscreen && (
				<>
					<h1>TD WebRTC LAN 💻📲</h1>
					<Grid container spacing={{ xl: 2 }} columns={{ xl: 1 }}>
						<SignalingClientPanel
							address={address}
							port={port}
							clients={webSocketClients}
							connectedToServer={connectedToServer}
							signalingClient={signalingClient}
							webRTCConnection={webRTCConnection}
							setPortHandler={handlePortChange}
							setAddressHandler={setAddress}
							fullscreenButton={
								<div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
									<Button variant="contained" onClick={handleFullscreen}>
										Go Fullscreen
									</Button>
									<Button variant="outlined" onClick={handleAutoStart}>
										AutoStart on Refresh
									</Button>
								</div>
							}

						/>


					</Grid>
				</>
			)}
			<div
				id="fullscreenArea"
				style={{
					width: "100vw",
					height: "100vh",
					transform: "scaleX(-1)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					overflow: "hidden"
				}}
			>
				<MediaPanel
					mouseDataChannel={mouseDataChannel}
					keyboardDataChannel={keyboardDataChannel}
					fullscreen={isFullscreen}
				/>
			</div>
		</Container>
	);
}

export default App;
