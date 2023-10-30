import { Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import socketManager from "./Sockets/CommunicationSocketManager";
import matchSocketManager from "./Sockets/MatchSocketManager";
import { useRouter } from "next/router";

export default function JoinCustomRoom() {
	const router = useRouter();
	const [roomName, setRoomName] = useState("");
	const handleJoinCustom = () => {
		matchSocketManager.emitEvent("match", {
			condition: roomName,
			difficulty: "",
			user: JSON.parse(sessionStorage.getItem("login")).email,
			videoSocket: socketManager.getSocketId(),
		});
		matchSocketManager.subscribeToEvent("matched", (data) => {
			const matchedUser = data.user;
			const matchedVideoSocket = data.videoSocket;
			const room = data.room;
			const difficulty = data.difficulty;
			console.log("matched", matchedUser, matchedVideoSocket, room);
			matchSocketManager.setMatchedDifficulty(difficulty);
			socketManager.setMatchedSocketId(matchedVideoSocket);
			matchSocketManager.setMatchedUser(matchedUser);
			matchSocketManager.setMatchedRoom(room);
			router.push("/collaboration");
		});
	};
	return (
		<Box>
			<Input onChange={(e) => setRoomName(e.target.value)} />
			<Button onClick={handleJoinCustom}>Join room</Button>
		</Box>
	);
}
