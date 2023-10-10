import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function MatchButton({ sendMatchedSocket }) {
	const [socket, setSocket] = useState(null);
	const [difficulty, setDifficulty] = useState("Easy");
	useEffect(() => {
		const socket = io("http://localhost:6927");
		setSocket(socket);
		socket.on("matched", (event) => {
			console.log(event);
			sendMatchedSocket(event);
		});
	}, []);
	const handleDifficultyChange = (e) => {
		setDifficulty(e.target.value);
		console.log(difficulty);
	};
	const handleMatch = () => {
		socket?.emit("match", difficulty);
		console.log("matching begins");
	};
	return (
		<Box>
			<Menu>
				<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
			<Button onClick={handleMatch}> Match</Button>
		</Box>
	);
}
