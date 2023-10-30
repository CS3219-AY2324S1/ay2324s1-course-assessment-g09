import {
	Box,
	Button,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import matchSocketManager from "./Sockets/MatchSocketManager";
import socketManager from "./Sockets/CommunicationSocketManager";

export default function CreateCustomRoom() {
	const router = useRouter();
	const [roomName, setRoomName] = useState("");
	const [difficulty, setDifficulty] = useState("Easy");
	const handleCreateCustom = () => {
		matchSocketManager.emitEvent("match", {
			condtion: roomName,
			difficulty: difficulty,
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

	const handleDifficultyChange = (e) => {
		setDifficulty(e.target.value);
	};
	return (
		<Box>
			<Menu>
				<MenuButton
					size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
					as={Button}
					rightIcon={<ChevronDownIcon />}
				>
					{difficulty == "Easy"
						? "Easy"
						: difficulty == "Medium"
						? "Medium"
						: difficulty == "Hard"
						? "Hard"
						: "Difficulty"}
				</MenuButton>
				<MenuList>
					<MenuItem onClick={handleDifficultyChange} value="Easy">
						Easy
					</MenuItem>
					<MenuItem onClick={handleDifficultyChange} value="Medium">
						Medium
					</MenuItem>
					<MenuItem onClick={handleDifficultyChange} value="Hard">
						Hard
					</MenuItem>
				</MenuList>
			</Menu>
			<Input onChange={(e) => setRoomName(e.target.value)} />

			<Button onClick={handleCreateCustom}>Create and join room</Button>
		</Box>
	);
}
