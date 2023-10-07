"use client";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Flex,
  Select,
  Button,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const isIncomingCode = useRef(false);
  const selectRef = useRef(null);
  const colorRef = useRef(null);
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const [language, setLangauge] = useState("javascript");

  const handleChange = (
    value = "",
    event: editor.IModelContentChangedEvent
  ) => {
    if (isIncomingCode.current) {
      isIncomingCode.current = false;
      return;
    }
    console.log("sent");
    socket?.emit("codeChange", event);
  };

  const handleThemeChange = (e) => {
    window.monaco.editor.setTheme(e.target.value);
  };

  const handleLanguageChange = (e) => {
    window.monaco.editor.setModelLanguage(
      editorRef.current?.getModel(),
      e.target.value
    );
    setLangauge(e.target.value);
    socket?.emit("languageChange", e.target.value);
  };

  useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);
    socket.on("codeChange", (event) => {
      isIncomingCode.current = true;
      console.log("received", event);
      editorRef.current.getModel()?.applyEdits(event.changes);
    });
    socket.on("languageChange", (event) => {
      console.log("received", event);
      window.monaco.editor.setModelLanguage(
        editorRef.current?.getModel(),
        event
      );
      selectRef.current.value = event;
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleFormat = () => {
    if (editorRef.current) {
      const editor = editorRef.current;

      // Specify the language ID (e.g., 'python' for Python)
      monaco.editor.setModelLanguage(editor.getModel(), language);

      // Check if the action exists
      const formatAction = editor.getAction("editor.action.formatDocument");

      if (formatAction) {
        // Execute the format action
        formatAction.run();
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" flex="1'" height="100%">
      <Grid templateColumns="repeat(4, 1fr)" gap={5} height="100%">
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
          <Select ref={colorRef} onChange={handleThemeChange}>
            <option value="light"> Light Theme</option>
            <option value="vs-dark"> Dark Theme </option>
          </Select>
        </GridItem>
        <GridItem>
          <Button
            onClick={() => alert(editorRef.current.getModel().getValue())}
            width="100%"
            colorScheme="green"
          >
            Get Code
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={handleFormat} width="100%" colorScheme="blue">
            Format Code
          </Button>
        </GridItem>
        <GridItem colSpan={4}>
          <Editor
            onChange={handleChange}
            theme="vc"
            onMount={handleEditorDidMount}
            defaultLanguage="javascript"
            defaultValue="// some comment"
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
