"use client";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import socketManager from "./Sockets/CommunicationSocketManager";
import VideoComponent from "./VideoComponent";
import { set } from "zod";

export default function VideoCall() {
	const self = socketManager.getSocketId();
	const idToCall = socketManager.getMatchedSocketId();
	const [callerStream, setcallerStream] = useState<MediaStream>();
	const [receiverStream, setReceiverStream] = useState<MediaStream>();
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const connectionRef = useRef(null);

	useEffect(() => {
		socketManager.subscribeToEvent("callUser", (data) => {
			setReceivingCall(true);
			setCaller(data.from);
			setCallerSignal(data.signal);
		});
	}, []);

	const getVideo = async () => {
		try {
			const callerStream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			setcallerStream(callerStream);
		} catch (err) {
			console.log(err);
		}
	};

	const callUser = async () => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: callerStream,
		});
		peer.on("signal", (data) => {
			socketManager.emitEvent("callUser", {
				userToCall: idToCall,
				signalData: data,
				from: self,
			});
		});
		peer.on("stream", (stream) => {
			setReceiverStream(stream);
		});
		socketManager.subscribeToEvent("callAccepted", (signal) => {
			console.log("call accepted");
			setCallAccepted(true);
			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const toggleCamera = () => {
		callerStream.getVideoTracks()[0].enabled =
			!callerStream.getVideoTracks()[0].enabled;
	};

	const answerCall = async () => {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: callerStream,
		});
		peer.on("signal", (data) => {
			console.log(data);
			socketManager.emitEvent("answerCall", { signal: data, to: caller });
		});
		peer.on("stream", (stream) => {
			setReceiverStream(stream);
		});
		peer.signal(callerSignal);
		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);
		connectionRef.current.destroy();
	};

	return (
		<Box>
			<Button onClick={toggleCamera} colorScheme="blue">
				Toggle Camera
			</Button>
			<Button onClick={getVideo} colorScheme="blue">
				Get Video
			</Button>
			{!callerStream ? null : (
				<Box>
					<VideoComponent stream={callerStream} isLocal={true} />
					<VideoComponent stream={receiverStream} isLocal={false} />
				</Box>
			)}

			<Button onClick={callUser} colorScheme="purple">
				Call
			</Button>

			{receivingCall ? (
				<Button onClick={answerCall} colorScheme="green">
					Answer
				</Button>
			) : null}
			{callAccepted && !callEnded ? (
				<Button onClick={leaveCall} colorScheme="red">
					End Call
				</Button>
			) : null}
		</Box>
	);
}
