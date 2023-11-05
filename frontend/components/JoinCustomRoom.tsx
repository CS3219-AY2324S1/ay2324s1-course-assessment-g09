import {
  Box,
  Input,
  Button,
  useColorMode,
  Heading,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import socketManager from "./Sockets/CommunicationSocketManager";
import matchSocketManager from "./Sockets/MatchSocketManager";
import { useRouter } from "next/router";

export default function JoinCustomRoom() {
  const { colorMode } = useColorMode();

  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const handleJoinCustom = () => {
    matchSocketManager.emitEvent("match", {
      condition: roomName,
      difficulty: "",
      user: JSON.parse(sessionStorage.getItem("login")).email,
      videoSocket: socketManager.getSocketId(),
    });
    matchSocketManager.subscribeToEvent("matched", (data) => {
      const matchedUser = data.user;
      const matchedVideoSocket = data.videoSocket;
      const room = data.room;
      const difficulty = data.difficulty;
      console.log("matched", matchedUser, matchedVideoSocket, room);
      matchSocketManager.setMatchedDifficulty(difficulty);
      socketManager.setMatchedSocketId(matchedVideoSocket);
      matchSocketManager.setMatchedUser(matchedUser);
      matchSocketManager.setMatchedRoom(room);
      router.push("/collaboration");
    });
  };
  return (
    <Box>
      <Heading
        as="h5"
        size="sm"
        mb={3}
        textDecoration="underline"
        textColor={colorMode == "light" ? "purple.500" : "purple.300"}
      >
        Join Room
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={3}>
          <Input
            onChange={(e) => setRoomName(e.target.value)}
            size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
            placeholder="Enter Room ID"
          />
        </GridItem>
      </Grid>
      <Center mt={4}>
        <Button
          onClick={handleJoinCustom}
          colorScheme="purple"
          size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
        >
          Join room
        </Button>
      </Center>
    </Box>
  );
}
