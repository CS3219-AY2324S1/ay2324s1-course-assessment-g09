"use client";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { io } from "socket.io-client";
import { Select } from "@chakra-ui/react";
import VideoCall from "../components/VideoCall";

export default function Collaboration() {
  const editorRef = useRef();
  const [socket, setSocket] = useState(null);
  const isIncomingCode = useRef(false);
  const [questions, setQuestions] = useState([]);
  const selectedItem = {
    name: "Two Sum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum nisl nibh, nec vestibulum odio pretium vel. Proin quis est dignissim elit tristique luctus sed eget tellus. Sed dapibus consequat semper. Nulla fringilla vulputate libero eu convallis. Aenean nec justo nulla. Pellentesque vel porttitor risus. Mauris porta, dui in venenatis auctor, turpis lorem egestas arcu, in maximus sem metus non turpis. Etiam laoreet mauris a diam tincidunt suscipit. Maecenas hendrerit urna vel congue ultrices. Praesent venenatis enim metus, et posuere nisi semper ut. Praesent porttitor placerat tellus nec pharetra. In hac habitasse platea dictumst. Phasellus lorem libero, venenatis in mauris vel, gravida vehicula nibh. Duis vestibulum congue velit, eu pretium orci sollicitudin nec. Curabitur augue elit, dictum vel nisl mattis, suscipit auctor justo. Aenean tempus volutpat lorem, a ultrices ipsum convallis sit amet. Vestibulum rutrum ut est id blandit. Cras ex leo, suscipit eget nulla eu, viverra faucibus neque. Aliquam arcu elit, imperdiet quis blandit vitae, rhoncus nec orci. Fusce sit amet dui sed lorem tempor molestie vitae sed nunc. Vestibulum blandit aliquam euismod. Maecenas sit amet sollicitudin nibh, eu elementum nulla. Pellentesque nisl magna, ultrices eu fringilla quis, ornare et est.",
    createdAt: "2022-10-22 20:19:50.236312+00:00",
    updatedAt: "2022-10-22 20:19:50.236312+00:00",
  };
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  const selectRef = useRef(null);
  const handleLanguageChange = (e) => {
    window.monaco.editor.setModelLanguage(
      editorRef.current?.getModel(),
      e.target.value
    );
    socket?.emit("languageChange", e.target.value);
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

  useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);
    socket.on("codeChange", (event) => {
      isIncomingCode.current = true;
      console.log("received", event);
      editorRef.current?.getModel()?.applyEdits(event.changes);
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
    <div>
      <select ref={selectRef} onChange={handleLanguageChange}>
        <option value="javascript">JS</option>
        <option value="python">Python</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
      </select>
      <Box display="flex" height="100vh">
        <Box flexDirection="column">
          {selectedItem && (
            <Box flex={1} alignSelf="top" m="30px">
              <Text>{selectedItem.content}</Text>
            </Box>
          )}
          <VideoCall />
        </Box>
        <Box flex={1} m="30px">
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
      </Box>
    </div>
  );
}
