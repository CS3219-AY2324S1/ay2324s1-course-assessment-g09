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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import axios from "axios";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const profile = ({ colorMode }) => {
  const cancelRef = React.useRef();

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

  // Reset the timer and put the user in the queue
  const handleQuickStart = () => {
    setInQueue(true);
    setMinutes(0);
    setSeconds(0);
  };

  // Pop the user from the queue and reset the timer
  const handleLeaveQueue = () => {
    setInQueue(false);
    setMinutes(0);
    setSeconds(0);
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

  const handleLogout = async () => {
    axios.post(`${IP_ADDRESS}:3004/userauth/signout`, {}, { withCredentials: true })
      .then(response => {
        if (response.statusText === 'OK') {
          router.push("/signin");
          window.sessionStorage.removeItem("login");
        }
      })
      .catch(error => {
        console.log("signout", error);
      })



  };

  return (
    <VStack>
      <WrapItem>
        <Avatar
          size={{ lg: "lg", xl: "lg", "2xl": "xl" }}
          name="Wilson Ng"
          bg={colorMode == "light" ? "cyan.500" : "cyan.700"}
        />
      </WrapItem>
      <Text
        fontSize={{ lg: "xl", xl: "xl", "2xl": "2xl" }}
        color={colorMode == "light" ? "black" : "white"}
        fontWeight="semibold"
      >
        Wilson Ng Jing An
      </Text>
      <Text
        fontSize={{ lg: "md", xl: "md", "2xl": "lg" }}
        color={colorMode == "light" ? "black" : "white"}
        fontFamily="monospace"
        fontWeight="bold"
      >
        @wilsonngja{" "}
        <Badge
          variant="outline"
          colorScheme="purple"
          fontSize={{ lg: "md", xl: "md", "2xl": "lg" }}
        >
          User
        </Badge>
      </Text>
      <Divider />
      <HStack mt={{ lg: 2, xl: 4, "2xl": 5 }}>
        {inQueue ? (
          <>
            <Button onClick={handleLeaveQueue} colorScheme="orange">
              Leave Queue
            </Button>
            <Text fontSize="xl" fontWeight="bold" ml={5}>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </Text>
          </>
        ) : (
          <>
            <Button
              colorScheme="purple"
              size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
              onClick={handleQuickStart}
            >
              Quick Start
            </Button>
            <Button
              colorScheme="blue"
              size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
            >
              Custom Room
            </Button>
            <Button
              colorScheme="red"
              size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
              onClick={handleLogout}
            >
              Log Out{" "}
            </Button>
          </>
        )}
      </HStack>

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
    </VStack>
  );
};

export default profile;
