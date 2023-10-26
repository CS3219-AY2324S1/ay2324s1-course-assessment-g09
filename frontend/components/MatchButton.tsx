import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import socketManager from "./Sockets/SocketManager";
export default function MatchButton({ sendMatchedData, handleQuickStart }) {
	const [difficulty, setDifficulty] = useState("Easy");

	const handleDifficultyChange = (e) => {
		setDifficulty(e.target.value);
		console.log(difficulty);
	};
	const handleMatch = async () => {
		console.log("matching begins");
		handleQuickStart();
		try {
			const data = {
				difficulty: difficulty,
				// userId: JSON.parse(sessionStorage.getItem("login")).email,
				userId: "test",
				videoSocket: socketManager.getSocketId(),
			};
			const res = await axios
				.post("http://localhost:1317/findMatch", data)
				.then((res) => {
					console.log(res.data);
					const { matchedUser, matchedSocket, receiverVideoSocket } =
						res.data;
					sendMatchedData(matchedSocket, matchedUser);
					socketManager.setMatchedSocketId(receiverVideoSocket);
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Box>
			<HStack>
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
						<MenuItem
							onClick={handleDifficultyChange}
							value="Medium"
						>
							Medium
						</MenuItem>
						<MenuItem onClick={handleDifficultyChange} value="Hard">
							Hard
						</MenuItem>
					</MenuList>
				</Menu>
				<Button
					colorScheme="purple"
					size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
					onClick={handleMatch}
				>
					Match
				</Button>
			</HStack>
		</Box>
	);
}
