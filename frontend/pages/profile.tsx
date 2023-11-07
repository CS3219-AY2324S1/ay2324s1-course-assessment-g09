import {
  Avatar,
  Divider,
  VStack,
  WrapItem,
  Text,
  HStack,
  Button,
  Badge,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import axios from "axios";
import MatchButton from "../components/MatchButton";
import socketManager from "../components/Sockets/CommunicationSocketManager";
import CustomRoomButton from "../components/CustomRoomButton";
import matchSocketManager from "../components/Sockets/MatchSocketManager";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const profile = ({ colorMode, userMode, userEmail }) => {
  const cancelRef = React.useRef();

  const [loggedInName, setLoggedInName] = useState("");
  const [loggedInUserName, setLoggedInUserName] = useState("");
  //   const [loggedInEmail, setLoggedInEmail] = useState("");

  const fetchLoggedInUser = async () => {
    if (userEmail != "") {
      const res = await axios.get(`user_service/users/getUserByEmail`, {
        params: { email: userEmail },
      });

      console.log(res.data);
      setLoggedInName(res.data.name);
      setLoggedInUserName(res.data.username);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, [loggedInName, loggedInUserName, userEmail]);

  // State Hook
  // inQueue refers to whether the user is looking for a match
  // timerValue refers to the circular progress that is decreasing when match found
  // countdown refers to the down counter inside the progress bar
  // seconds portion of the duration when in queue
  // minutes portion of the duration when in queue
  // isMatchFound refers to the boolean state on whether the match has been found
  const [inQueue, setInQueue] = useState(false);
  const [timerValue, setTimerValue] = useState(100);
  const [countdown, setCoundown] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isMatchFound, setIsMatchFound] = useState(false);

  const handleQuickStart = () => {
    setInQueue(true);
    setMinutes(0);
    setSeconds(0);
  };

  // Pop the user from the queue and reset the timer
  const handleLeaveQueue = async () => {
    setInQueue(false);
    setMinutes(0);
    setSeconds(0);
    matchSocketManager.emitEvent("leaveQueue", { condition: "", socketId: matchSocketManager.getSocketId() });
    console.log("leaving queue")
  };

  // Disclosure for Match Found
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Stopwatch when in queue
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (inQueue && !isMatchFound) {
      // Ran once every second
      interval = setInterval(() => {
        // if the previous second is 59, set to 0, else add 1
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [inQueue]);

  // useEffect hook to reduce the value of progress bar once even 100ms
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerValue > 0 && isOpen) {
      interval = setInterval(() => {
        setTimerValue((prevTimer) => {
          return prevTimer - 2;
        });
      }, 100);

      // Set the countdown based on the value of the progress bar.
      setCoundown(Math.floor(timerValue / 20) + 1);
    }

    // If the progress value falls to 0, bring the user back to queue
    // and resume the queue
    if (timerValue <= 0) {
      setIsMatchFound(false);
      onClose();
      clearInterval(interval);
      setInQueue(true);
      setTimerValue(100);
    }

    if (seconds >= 30) {
      handleLeaveQueue();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  // An arbitary function to execute the alert box when match is found.
  // For this effect hook, the trigger is 2 minutes. This can be replaced
  // with the related condition for matching.
  useEffect(() => {
    if (minutes === 2 && seconds === 0) {
      setIsMatchFound(true);
      setInQueue(false);
      onOpen();
    }
  }, [minutes]);

  return (
    <Grid width="100%" height="100%" templateColumns="repeat(4, 1fr)">
      {/* Avatar */}
      <GridItem
        display="flex"
        colSpan={1}
        rowSpan={2}
        justifyContent="center"
        mt={2}
      >
        <Avatar
          size={{ lg: "lg", xl: "lg", "2xl": "xl" }}
          name={loggedInName ? loggedInName : "N A"}
          bg={colorMode == "light" ? "blue.500" : "blue.400"}
          m={2}
        />
      </GridItem>

      {/* Name */}
      <GridItem
        colSpan={3}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-end"
        height="100%"
      >
        <Text
          fontSize={{ lg: "xl", xl: "lg", "2xl": "2xl" }}
          color={colorMode == "light" ? "black" : "white"}
          fontWeight="semibold"
          ml={2}
        >
          {loggedInName}
        </Text>
      </GridItem>

      {/* Username */}
      <GridItem colSpan={3} display="flex" justifyContent="flex-start">
        <HStack ml={2}>
          <Text
            fontSize={{ lg: "lg", xl: "lg", "2xl": "xl" }}
            color={colorMode == "light" ? "black" : "white"}
            fontFamily="monospace"
            fontWeight="bold"
            mt={1}
          >
            @{loggedInUserName}{" "}
          </Text>
          <Badge
            variant="outline"
            colorScheme={userMode.toLowerCase() === "user" ? "green" : "red"}
            fontSize={{ lg: "sm", xl: "sm", "2xl": "md" }}
          >
            {userMode}
          </Badge>
        </HStack>
      </GridItem>

      {inQueue ? (
        <GridItem
          colSpan={4}
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          my={2}
        >
          <HStack align="center" justify="center">
            <Button
              onClick={handleLeaveQueue}
              colorScheme="orange"
              size={{ lg: "xs", xl: "sm", "2xl": "lg" }}
            >
              Leave Queue
            </Button>
            <Text
              fontSize={{ lg: "lg", xl: "xl", "2xl": "2xl" }}
              fontWeight="bold"
              ml={5}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </Text>
          </HStack>
        </GridItem>
      ) : (
        <>
          <GridItem
            colSpan={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={2}
            ml={2}
          >
            <MatchButton handleQuickStart={handleQuickStart} />
          </GridItem>
          <GridItem
            colSpan={2}
            display="flex"
            alignItems="center"
            my={2}
            justifyContent="center"
          >
            {/* <Button
							colorScheme="blue"
							size={{ lg: "xs", xl: "sm", "2xl": "lg" }}
							width="90%"
							mx={2}
						>
							Custom Room
						</Button> */}
            <CustomRoomButton />
          </GridItem>
        </>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="xl"
              fontWeight="bold"
              textAlign="center"
            >
              A Match has been found!
            </AlertDialogHeader>

            <AlertDialogBody>
              <Center mt={5}>
                <CircularProgress
                  value={timerValue}
                  color={
                    countdown >= 3
                      ? colorMode == "light"
                        ? "green.500"
                        : "green.300"
                      : countdown > 1
                        ? colorMode == "light"
                          ? "orange.500"
                          : "orange.300"
                        : colorMode == "light"
                          ? "red.500"
                          : "red.300"
                  }
                  size="70px"
                >
                  <CircularProgressLabel
                    color={
                      countdown >= 3
                        ? colorMode == "light"
                          ? "green.500"
                          : "green.300"
                        : countdown > 1
                          ? colorMode == "light"
                            ? "orange.500"
                            : "orange.300"
                          : colorMode == "light"
                            ? "red.500"
                            : "red.300"
                    }
                    fontWeight="semibold"
                  >
                    {countdown}
                  </CircularProgressLabel>
                </CircularProgress>
              </Center>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="green" onClick={onClose}>
                Accept
              </Button>
              <Button
                ref={cancelRef}
                onClick={onClose}
                ml={3}
                colorScheme="orange"
              >
                Decline
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Grid>
  );
};

export default profile;
