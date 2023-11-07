import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import matchSocketManager from "./Sockets/MatchSocketManager";
import socketManager from "./Sockets/CommunicationSocketManager";

export default function CreateCustomRoom() {
  const complexityColor = {
    Easy: "green",
    Medium: "orange",
    Hard: "red",
  };

  const { colorMode } = useColorMode();

  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [roomExists, setRoomExists] = useState(false);
  const [matching, setMatching] = useState(false);
  const handleCreateCustom = () => {
    setRoomExists(false);
    setMatching(true);
    matchSocketManager.emitEvent("match", {
      condition: roomName,
      difficulty: difficulty,
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

    matchSocketManager.subscribeToEvent("error", (data) => {
      setRoomExists(true);
      console.log("error", data);
    });
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const complexityTextColor = {
    Easy: { light: "green.500", dark: "green.300" },
    Medium: { light: "orange.500", dark: "orange.300" },
    Hard: { light: "red.500", dark: "red.300" },
  };

  function handleLeaveCustom() {
    setMatching(false);
    matchSocketManager.emitEvent("leaveQueue", {
      condition: roomName,
      socket: matchSocketManager.getSocketId(),
    });
    console.log("leaving custom")
  }

return (
    <Box>
      <Heading
        as="h5"
        size="sm"
        mb={3}
        textDecoration="underline"
        textColor={colorMode == "light" ? "green.500" : "green.300"}
      >
        Create Room
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem>
          <Menu>
            <MenuButton
              size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme={complexityColor[difficulty]}
            >
              {difficulty == "Easy"
                ? "Easy"
                : difficulty == "Medium"
                ? "Medium"
                : difficulty == "Hard"
                ? "Hard"
                : "Difficulty"}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={handleDifficultyChange}
                value="Easy"
                color={complexityTextColor["Easy"][colorMode]}
                fontWeight="bold"
              >
                Easy
              </MenuItem>
              <MenuItem
                onClick={handleDifficultyChange}
                value="Medium"
                color={complexityTextColor["Medium"][colorMode]}
                fontWeight="bold"
              >
                Medium
              </MenuItem>
              <MenuItem
                onClick={handleDifficultyChange}
                value="Hard"
                color={complexityTextColor["Hard"][colorMode]}
                fontWeight="bold"
              >
                Hard
              </MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            onChange={(e) => setRoomName(e.target.value)}
            size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
            placeholder="Enter Room ID"
          />
        </GridItem>
      </Grid>
      <Center mt={4}>
        <Button
          onClick={handleCreateCustom}
          size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
          colorScheme="green"
        >
          Create Room
        </Button>
      </Center>

      {/* (roomExists &&
			<Text>Please choose another name, the room already exist</Text>) */}
    </Box>
  );
}
