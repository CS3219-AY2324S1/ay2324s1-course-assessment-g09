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

type history = {
	_id: string;
	questionName: string;
	question: string;
	code: string;
	language: string;
	theme: string;
	createdAt: string;
	updatedAt: string;
	user1: string;
	user2: string;
};
export default function History() {
	const [user, setUser] = useState("Dennis");
	const [history, setHistory] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const res = await axios.get(
					`/history_service/history/get/${user}`
				);

				setHistory(
					res.data
						.slice()
						.sort(
							(a, b) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
						)
				);
			} catch (error) {
				console.log("ERROR: ", error);
			}
		};
		fetchHistory();
	}, []);
	return (
		<Box>
			{history &&
				history.map((record, index) => (
					<Box key={index}>
						<Button
							onClick={() => {
								setSelectedItem(record);
								onOpen();
							}}
						>
							<Text>{index}</Text>
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
					</Box>
				))}
			<Modal isOpen={isOpen} onClose={onClose} size="6xl">
				<ModalOverlay />
				<ModalContent maxW="80%" minH="80%">
					{selectedItem && (
						<Box>
							<ModalHeader>
								{selectedItem.questionName}
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Grid
									templateColumns="repeat(2, 1fr)"
									gap={6}
									height="75vh"
								>
									<GridItem colSpan={1}>
										<Text>{selectedItem.question}</Text>
									</GridItem>
									<GridItem colSpan={1}>
										<Editor
											defaultValue={selectedItem.code}
											defaultLanguage={
												selectedItem.language
											}
											theme={selectedItem.theme}
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
						</Box>
					)}
				</ModalContent>
			</Modal>
		</Box>
	);
}
