"use client";
import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import MatchsocketManager from "../components/Sockets/MatchSocketManager";
import ToggleMode from "../components/ToggleMode";
import VideoCall from "../components/VideoCall";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import collabSocketManager from "../components/Sockets/CollabSocketManager";

export default function Collaboration() {
  interface Question {
    category: string;
    complexity: string;
    description: string;
    qn_num: number;
    title: string;
  }
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");

  const room = MatchsocketManager.getMatchedRoom();
  const matchedUser = MatchsocketManager.getMatchedUser();

  const [videoOn, setVideoOn] = useState(false);

  const [qnsNum, setQnsNum] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [qns, setQns] = useState<Question[]>([
    { category: "", description: "", qn_num: 0, title: "", complexity: "" },
    { category: "", description: "", qn_num: 0, title: "", complexity: "" },
    { category: "", description: "", qn_num: 0, title: "", complexity: "" },
    { category: "", description: "", qn_num: 0, title: "", complexity: "" },
  ]);

  useEffect(() => {
    console.log(qns[qnsNum]);
    setTitle(qns[qnsNum].title);
    setComplexity(qns[qnsNum].complexity);

    let desc = qns[qnsNum].description;
    desc = desc.replace(/<code>/g, "");
    desc = desc.replace(/<\/code>/g, "");

    setContent(desc);
  }, [qnsNum]);

  const fetchRandomQuestions = async () => {
    try {
      // const res = await axios.get(`question_service/questions/4`);
      // setQns(qns);
      collabSocketManager.emitEvent("getQns", "");
      collabSocketManager.subscribeToEvent("qnsRes", (qns) => {
        setQns(qns);
        let desc = qns[qnsNum].description;
        setTitle(qns[qnsNum].title);
        setComplexity(qns[qnsNum].complexity);

        desc = desc.replace(/<code>/g, "");
        desc = desc.replace(/<\/code>/g, "");

        setContent(desc);
        setTitle(qns[qnsNum].title);
        setComplexity(qns[qnsNum].complexity);
      });

      // console.log(qns[0]);

      // console.log(res.data);

    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleNextQns = () => {
    if (qnsNum != 3) {
      setQnsNum(qnsNum + 1);
    }
  };

  const handlePrevQns = () => {
    if (qnsNum != 0) {
      setQnsNum(qnsNum - 1);
    }
  };

  // // Stopwatch when in queue
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;

  //   // Ran once every second
  //   interval = setInterval(() => {
  //     // if the previous second is 59, set to 0, else add 1
  //     setSeconds((prevSeconds) => {
  //       if (prevSeconds === 59) {
  //         setMinutes((prevMinutes) => prevMinutes + 1);
  //         return 0;
  //       } else {
  //         return prevSeconds + 1;
  //       }
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  useEffect(() => {
    fetchRandomQuestions();
    collabSocketManager.subscribeToEvent("setTimer", (data) => {
      setMinutes(data.minutes);
      setSeconds(data.seconds);
    })
  }, []);

  return (
    <Box height="100vh" display="flex" flexDirection="column" mx={4}>
      <HStack justifyContent="center" width="100%" height="5%">
        <Text
          fontSize={{ lg: "lg", xl: "xl", "2xl": "2xl" }}
          fontWeight="bold"
          ml={5}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </Text>
        <Button onClick={() => {
          collabSocketManager.emitEvent("startTimer", "");
          setStarted(true);
        }}>Start</Button>
        <Button onClick={() => collabSocketManager.emitEvent("stopTimer", "")}>Pause</Button>
        <Button onClick={() => {
          collabSocketManager.emitEvent("resetTimer", "");
        }}>Reset</Button>
        <ToggleMode colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </HStack>

      <Grid
        flex="1"
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={5}
        height="85%"
        width="100%"
        my="auto"
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
          mt={2}
        >
          <Box flexDirection="column">
            {content && (
              <Box flex={1} alignSelf="top">
                <HStack width="full" justify="space-between">
                  <>
                    <Text fontSize="2xl">
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
                    </Text>
                  </>
                  <HStack mr={2}>
                    <IconButton
                      icon={<AiFillCaretLeft />}
                      colorScheme="teal"
                      size="sm"
                      isDisabled={qnsNum === 0}
                      onClick={handlePrevQns}
                      aria-label="Previous"
                    />
                    <Text>{qnsNum + 1}</Text>
                    <IconButton
                      icon={<AiFillCaretRight />}
                      colorScheme="teal"
                      size="sm"
                      aria-label="Next"
                      isDisabled={qnsNum === 3}
                      onClick={handleNextQns}
                    />
                  </HStack>
                </HStack>
                <Box>
                  {/* <Icon as={GrPrevious} /> */}
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
        <GridItem height="90%" overflowY="hidden" rowSpan={10} my="auto">
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
    </Box>
  );
}
