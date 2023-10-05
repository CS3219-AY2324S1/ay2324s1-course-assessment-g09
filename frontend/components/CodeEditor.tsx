"use client";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Box, Flex, Select, Button } from "@chakra-ui/react";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const isIncomingCode = useRef(false);
  const selectRef = useRef(null);
  const colorRef = useRef(null);
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

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

  return (
    <Box>
      <Flex flexDirection="row">
        <Select ref={selectRef} onChange={handleLanguageChange}>
          <option value="javascript">JS</option>
          <option value="python">Python</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
        </Select>
        <Select ref={colorRef} onChange={handleThemeChange}>
          <option value="light"> Light Theme</option>
          <option value="vs-dark"> Dark Theme </option>
        </Select>
        <Button onClick={() => alert(editorRef.current.getModel().getValue())}>
          Get Code
        </Button>
      </Flex>
      <Editor
        onChange={handleChange}
        height="100vh"
        width="50vw"
        theme="vc"
        onMount={handleEditorDidMount}
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </Box>
  );
}
