"use client";
import {
	Box,
	Button,
	Grid,
	GridItem,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Select,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import SaveHistoryButton from "./SaveHistoryButton";

export default function CodeEditor({ socketRoom, matchedUser, colorMode }) {
	const editorRef = useRef(null);
	const [socket, setSocket] = useState(null);
	const isIncomingCode = useRef(false);
	const colorRef = useRef(null);
	const [language, setLanguage] = useState("javascript");
	const [code, setCode] = useState("//some comments");
	const [theme, setTheme] = useState("light");
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
		console.log("sent");
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
		const socket = io("http://localhost:8001");
		setSocket(socket);

		socket?.emit("joinRoom", socketRoom);

		socket.on("codeChange", (event) => {
			isIncomingCode.current = true;
			console.log("received", event);
			editorRef.current.getModel()?.applyEdits(event.changes);
		});

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
				<SaveHistoryButton
					code={code}
					theme={theme}
					language={language}
					difficulty={"Easy"}
				/>
				{/* <Button

						onClick={() =>
							alert(editorRef.current.getModel().getValue())
						}
						width="100%"
						colorScheme="green"
					>
						Save History
					</Button> */}
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
	);
}
