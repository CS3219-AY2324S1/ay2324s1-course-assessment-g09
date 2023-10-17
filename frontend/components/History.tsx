import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Text,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

export default function History() {
	const [user, setUser] = useState("Dennis");
	const [history, setHistory] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const res = await axios.get(
					`http://localhost:6969/history/get/${user}`
				);
				console.log(res.data);
				setHistory(res.data);
			} catch (error) {
				console.log("ERROR: ", error);
			}
		};
		fetchHistory();
	}, []);
	return (
		<Box>
			{history &&
				history.map((record) => (
					<Box key={record._id}>
						<Button onClick={onOpen}>
							<Text>{record.questionName}</Text>
							<Text>
								Date:{" "}
								{new Date(
									record.createdAt
								).toLocaleDateString()}
								, Time:
								{new Date(
									record.createdAt
								).toLocaleTimeString()}
							</Text>
						</Button>
						<Modal isOpen={isOpen} onClose={onClose} size="6xl">
							<ModalOverlay />
							<ModalContent maxW="80%" minH="80%">
								<ModalHeader>{record.questionName}</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Grid
										templateColumns="repeat(2, 1fr)"
										gap={6}
										height="75vh"
									>
										<GridItem colSpan={1}>
											<Text>{record.question}</Text>
											<Text>{record.code}</Text>
										</GridItem>
										<GridItem colSpan={1}>
											<Editor
												defaultValue={record.code}
												defaultLanguage={
													record.language
												}
												theme={record.theme}
												options={{
													readOnly: true,
												}}
											/>
										</GridItem>
									</Grid>
								</ModalBody>

								<ModalFooter>
									<Button
										colorScheme="blue"
										mr={3}
										onClick={onClose}
									>
										Close
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</Box>
				))}
		</Box>
	);
}
