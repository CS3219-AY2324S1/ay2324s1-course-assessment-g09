"use client";
import {
  Badge,
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import MatchsocketManager from "../components/Sockets/MatchSocketManager";
import ToggleMode from "../components/ToggleMode";
import VideoCall from "../components/VideoCall";

export default function Collaboration() {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");

  const room = MatchsocketManager.getMatchedRoom();
  const matchedUser = MatchsocketManager.getMatchedUser();

  const [videoOn, setVideoOn] = useState(false);
  const fetchRandomQuestions = async () => {
    try {
      const res = await axios.get(`question_service/questions/random`);
      console.log(res.data);
      let desc = res.data.qn.description;
      setTitle(res.data.qn.title);
      setComplexity(res.data.qn.complexity);

      desc = desc.replace(/<code>/g, "");
      desc = desc.replace(/<\/code>/g, "");

      setContent(desc);
      setTitle(res.data.qns[6].title);
      setComplexity(res.data.qns[6].complexity);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchRandomQuestions();
  }, []);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <HStack justifyContent="center" width="100%" height="5%">
        <ToggleMode colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </HStack>

      <Grid
        flex="1"
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={5}
        height="95%"
        width="100%"
      >
        {/* Questions */}
        <GridItem
          height="100%"
          rowSpan={videoOn ? 5 : 9}
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "0.25em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor:
                colorMode == "light"
                  ? "RGBA(0, 0, 0, 0.7)"
                  : "RGBA(255, 255, 255, 0.48)",
            },
          }}
        >
          <Box flexDirection="column">
            {content && (
              <Box flex={1} alignSelf="top">
                <Heading as="h5">
                  {title}{" "}
                  <Badge
                    fontSize="lg"
                    colorScheme={
                      complexity == "Easy"
                        ? "green"
                        : complexity == "Medium"
                        ? "orange"
                        : "red"
                    }
                  >
                    {complexity}
                  </Badge>
                </Heading>
                <Box>
                  <div
                    style={{
                      overflowWrap: "break-word",
                    }}
                  >
                    <style>
                      {`
      div > pre {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
      }
    `}
                    </style>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </Box>
              </Box>
            )}
          </Box>
        </GridItem>

        {/* Editor */}
        <GridItem height="100%" overflowY="hidden" rowSpan={10}>
          <CodeEditor
            socketRoom={room}
            matchedUser={matchedUser}
            colorMode={colorMode}
          />
        </GridItem>

        <GridItem rowSpan={videoOn ? 5 : 1}>
          <VideoCall videoOn={videoOn} setVideoOn={setVideoOn} />
        </GridItem>
      </Grid>

      {/* <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={5} h="80vh">
          <GridItem display="flex" flex="1"></GridItem>
          <GridItem display="flex" flex="1"></GridItem>
        </Grid>
      </Box> */}
    </Box>
  );
}
