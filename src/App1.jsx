import { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Import local components
import SignalingClientPanel from "./components/SignalingClientPanel";
import MediaPanel from "./components/MediaPanel";

// Handles and util fonctions
import WebRTCConnection from "./utils/webRTCConnection";
import SignalingClient from "./utils/signalingClient";

function App() {
	// App state management à la React
	const [port, setPort] = useState(443);
	const [address, setAddress] = useState("wss://127.0.0.1");
	const [webSocketClients, setWebSocketClients] = useState([]);
	const [connectedToServer, setConnectedToServer] = useState(false);
	const [mouseDataChannel, setMouseDataChannel] = useState();
	const [keyboardDataChannel, setKeyboardDataChannel] = useState();
	const [signalingClient, setSignalingClient] = useState();
	const [webRTCConnection, setWebRTCConnection] = useState();

	/************************************************************************
	 * React app rendering
	 */
	// We need to use the useEffect hook in order to not open a ws at every refresh
	useEffect(() => {
		// Instantiate Websocket and bing its handlers
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

		// Disconnect when done
		return () => {
			// Close websocket
			signalingClient.close();
		};
	}, []);

	const autoStartTriggered = useRef(false);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const autoStart = params.get("start");

		if (
			autoStart === "true" &&
			webSocketClients.length > 0 &&
			webRTCConnection &&
			signalingClient &&
			!autoStartTriggered.current
		) {
			// Small timeout ensures React has rendered everything
			console.log("POOOOOOOP")
			setTimeout(() => {
				const firstClient = webSocketClients[0];
				if (firstClient?.address && firstClient?.properties) {
					console.log("✅ Auto-starting call with:", firstClient.address);
					webRTCConnection.onCallStart(firstClient.address, firstClient.properties);
					webRTCConnection.onCallStart(address, properties)
					autoStartTriggered.current = true;
				}
			}, 100); // 100ms delay to let state settle
		}
	}, [webSocketClients, webRTCConnection, signalingClient]);





	return (
		<Container id="tdApp" maxWidth="xl">
			<CssBaseline />
			<h1>TD WebRTC Over LAN 💻📲</h1>
			<Grid container spacing={{ xl: 2 }} columns={{ xl: 1 }}>
				<SignalingClientPanel
					address={address}
					port={port}
					clients={webSocketClients}
					connectedToServer={connectedToServer}
					signalingClient={signalingClient}
					webRTCConnection={webRTCConnection}
					setPortHandler={setPort}
					setAddressHandler={setAddress}
				/>
				<MediaPanel
					mouseDataChannel={mouseDataChannel}
					keyboardDataChannel={keyboardDataChannel}
				/>
			</Grid>
		</Container>
	);
}

export default App;
