"use client";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import socketManager from "./Sockets/SocketManager";

export default function VideoCall() {
	const [self, setSelf] = useState(null);
	const [stream, setStream] = useState<MediaStream>();
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [idToCall, setIdToCall] = useState("");
	const [callEnded, setCallEnded] = useState(false);
	const [name, setName] = useState("");
	const callerVideo = useRef(null);
	const receiverVideo = useRef(null);
	const connectionRef = useRef(null);

	useEffect(() => {
		const initiator = new Peer({ initiator: true, trickle: false });
		const receiver = new Peer({ trickle: false });
		// Set up the initiator's local stream
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((localStream) => {
				callerVideo.current.srcObject = localStream;
				initiator.addStream(localStream);

				// When the initiator's signal is ready, send it to the receiver
				initiator.on("signal", (data) => {
					socketManager.emitEvent("signal", {
						to: socketManager.getMatchedSocketId(),
						signal: data,
					}); // Send the signal to the receiver
					console.log("initiator signal sent");
					console.log(socketManager.getMatchedSocketId());
					socketManager.emitEvent("test", {
						to: socketManager.getMatchedSocketId(),
						signal: data,
					});
				});
			})
			.catch((error) => {
				console.error("Error accessing camera and microphone:", error);
			});
		// When the receiver receives a signal, signal back
		socketManager.subscribeToEvent("signal", (data) => {
			console.log("receiver signal received");
			receiver.signal(data);
		});

		// When the connection is established, display the remote video
		receiver.on("connect", () => {
			console.log("Connection established");
		});

		// When the receiver receives a remote stream, display it
		receiver.on("stream", (remoteStream) => {
			console.log("receiver stream received");
			receiverVideo.current.srcObject = remoteStream;
		});

		return () => {
			initiator.destroy();
			receiver.destroy();
		};
	}, []);
	// useEffect(() => {
	// 	const getVideo = async () => {
	// 		try {
	// 			const stream = await navigator.mediaDevices.getUserMedia({
	// 				video: true,
	// 				audio: true,
	// 			});
	// 			setStream(stream);
	// 			myVideo.current.srcObject = stream;
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	setSelf(socketManager.getSocketId());
	// 	getVideo();
	// 	socketManager.subscribeToEvent("callUser", (data) => {
	// 		setReceivingCall(true);
	// 		setCaller(data.from);
	// 		setName(data.name);
	// 		setCallerSignal(data.signal);
	// 	});
	// }, []);

	// const callUser = async () => {
	// 	const peerCaller = new Peer({
	// 		initiator: true,
	// 		trickle: false,
	// 		stream: stream,
	// 	});
	// 	peerCaller.on("signal", (data) => {
	// 		socketManager.emitEvent("callUser", {
	// 			userToCall: idToCall,
	// 			signalData: data,
	// 			from: self,
	// 			name: name,
	// 		});
	// 	});
	// 	peerCaller.on("stream", (stream) => {
	// 		userVideo.current.srcObject = stream;
	// 	});

	// 	socketManager.subscribeToEvent("callAccepted", (signal) => {
	// 		console.log("call accepted");
	// 		setCallAccepted(true);
	// 		peerCaller.signal(signal);
	// 	});
	// 	connectionRef.current = peerCaller;
	// };

	// const answerCall = async () => {
	// 	setCallAccepted(true);
	// 	const peerReceiver = new Peer({
	// 		initiator: false,
	// 		trickle: false,
	// 		stream: stream,
	// 	});
	// 	peerReceiver.on("signal", (data) => {
	// 		console.log(data);
	// 		socketManager.emitEvent("answerCall", { signal: data, to: caller });
	// 	});
	// 	peerReceiver.on("stream", (stream) => {
	// 		if (userVideo.current) {
	// 			userVideo.current.srcObject = stream;
	// 		}
	// 	});
	// 	peerReceiver.signal(callerSignal);
	// 	connectionRef.current = peerReceiver;
	// };

	// const leaveCall = () => {
	// 	setCallEnded(true);
	// 	connectionRef.current.destroy();
	// };

	return (
		<Box>
			<video
				playsInline
				muted
				ref={callerVideo}
				autoPlay
				style={{ width: "300px" }}
			/>
			<video
				playsInline
				ref={receiverVideo}
				autoPlay
				style={{ width: "300px" }}
			/>
		</Box>
	);
}
