"use client";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Grid,
	GridItem,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import EndMatchButton from "./EndMatchButton";
import { on } from "events";
import matchSocketManager from "./Sockets/MatchSocketManager";

export default function CodeEditor({ socketRoom, matchedUser, colorMode }) {
	const editorRef = useRef(null);
	const [socket, setSocket] = useState(null);
	const isIncomingCode = useRef(false);
	const colorRef = useRef(null);
	const [language, setLanguage] = useState("javascript");
	const [code, setCode] = useState("//some comments");
	const [theme, setTheme] = useState("light");
	const cancelRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: modalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
	const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		editorRef.current = editor;
	};

	useEffect(() => {
		handleThemeChange(colorMode);
	}, [colorMode]);
	const handleCodeChange = (
		value = "",
		event: editor.IModelContentChangedEvent
	) => {
		if (isIncomingCode.current) {
			isIncomingCode.current = false;
			return;
		}
		setCode(editorRef.current.getModel().getValue());
		socket?.emit("codeChange", event);
	};

	const handleThemeChange = (e: string) => {
		if ((window as any).monaco != undefined) {
			(window as any).monaco.editor.setTheme(
				e === "light" ? "light" : "vs-dark"
			);
		}
	};

	const handleLanguageChange = (e) => {
		(window as any).monaco.editor.setModelLanguage(
			editorRef.current?.getModel(),
			e.target.value
		);
		setLanguage(e.target.value);
		socket?.emit("languageChange", e.target.value);
	};

	useEffect(() => {
		const socket = io({ path: "/collaboration_service/socket.io/" });
		setSocket(socket);

		socket?.emit("joinRoom", socketRoom);

		socket.on("codeChange", (event) => {
			isIncomingCode.current = true;
			editorRef.current.getModel()?.applyEdits(event.changes);
			setCode(editorRef.current.getModel().getValue());
		});

		matchSocketManager.subscribeToEvent("matchEnded", () => {
			console.log("match ended");
			onOpen();
		})

		socket.on("languageChange", (event) => {
			console.log("received", event);
			(window as any).monaco.editor.setModelLanguage(
				editorRef.current?.getModel(),
				event
			);
			setLanguage(event);
		});
		return () => {
			socket.disconnect();
		};
	}, []);

	const handleFormat = () => {
		if (editorRef.current) {
			const editor = editorRef.current;

			// Specify the language ID (e.g., 'python' for Python)
			(window as any).monaco.editor.setModelLanguage(
				editor.getModel(),
				language
			);

			// Check if the action exists
			const formatAction = editor.getAction("editor.action.formatDocument");

			if (formatAction) {
				// Execute the format action
				formatAction.run();
			}
		}
	};

	return (
		<>
			<Grid templateColumns="repeat(4, 1fr)" gap={5} height="100%" width="100%">
				<GridItem>
					<Menu>
						<MenuButton as={Button} width="100%">
							{language == "javascript"
								? "Javascript"
								: language == "python"
									? "Python"
									: language == "C++"
										? "C++"
										: "Java"}
						</MenuButton>
						<MenuList>
							<MenuItem onClick={handleLanguageChange} value="javascript">
								Javascript
							</MenuItem>
							<MenuItem onClick={handleLanguageChange} value="python">
								Python
							</MenuItem>
							<MenuItem onClick={handleLanguageChange} value="C++">
								C++
							</MenuItem>
							<MenuItem onClick={handleLanguageChange} value="Java">
								Java
							</MenuItem>
						</MenuList>
					</Menu>
				</GridItem>

				<GridItem>
					<Button onClick={onModalOpen}>End Match</Button>
					<Modal isOpen={modalOpen} onClose={onModalClose}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Modal Title</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								Are you sure you want to end the match?
							</ModalBody>

							<ModalFooter>
								<Button colorScheme='blue' mr={3} onClick={onClose}>
									Close
								</Button>
								<EndMatchButton
									code={code}
									theme={theme}
									language={language}
									difficulty={"Easy"}
								/>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</GridItem>
				<GridItem>
					<Button onClick={handleFormat} width="100%" colorScheme="blue">
						Format Code
					</Button>
				</GridItem>
				<GridItem colSpan={4}>
					<Editor
						onChange={handleCodeChange}
						theme={colorMode == "light" ? "light" : "vs-dark"}
						onMount={handleEditorDidMount}
						defaultLanguage="javascript"
						defaultValue="// some comment"
					/>
				</GridItem>
			</Grid>
			<AlertDialog
				motionPreset='slideInBottom'
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						The other user has left the match, please exit.
					</AlertDialogBody>
					<AlertDialogFooter>
						<EndMatchButton
							code={code}
							theme={theme}
							language={language}
							difficulty={"Easy"}
						/>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
