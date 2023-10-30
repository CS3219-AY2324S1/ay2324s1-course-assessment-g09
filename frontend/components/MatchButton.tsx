import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import socketManager from "./Sockets/CommunicationSocketManager";
import MatchsocketManager from "./Sockets/MatchSocketManager";
import { useRouter } from "next/router";

export default function MatchButton({ handleQuickStart }) {
  const [difficulty, setDifficulty] = useState("Easy");
  const router = useRouter();

  const { colorMode } = useColorMode();

  const complexityColor = {
    Easy: {
      light: "green.500",
      dark: "green.300",
    },
    Medium: {
      light: "orange.500",
      dark: "orange.300",
    },
    Hard: {
      light: "red.500",
      dark: "red.300",
    },
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    console.log(difficulty);
  };
  const handleMatch = async () => {
    console.log("matching begins");
    handleQuickStart();
    try {
      const data = {
        difficulty: difficulty,
        user: JSON.parse(sessionStorage.getItem("login")).email,
        // user: "test",
        videoSocket: socketManager.getSocketId(),
      };
      console.log(data);
      MatchsocketManager.emitEvent("match", data);
    } catch (error) {
      console.log(error);
    }
    MatchsocketManager.subscribeToEvent("matched", (data) => {
      const matchedUser = data.user;
      const matchedVideoSocket = data.videoSocket;
      const room = data.room;
      console.log("matched", matchedUser, matchedVideoSocket, room);
      socketManager.setMatchedSocketId(matchedVideoSocket);
      MatchsocketManager.setMatchedUser(matchedUser);
      MatchsocketManager.setMatchedRoom(room);
      router.push("/collaboration");
    });
  };
  return (
    <Box>
      <HStack>
        <Menu>
          <MenuButton
            size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bgColor={complexityColor[difficulty][colorMode]}
            color={colorMode == "light" ? "white" : "black"}
            // fontWeight="bold"
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
              color={complexityColor["Easy"][colorMode]}
              fontWeight="bold"
            >
              Easy
            </MenuItem>
            <MenuItem
              onClick={handleDifficultyChange}
              value="Medium"
              color={complexityColor["Medium"][colorMode]}
              fontWeight="bold"
            >
              Medium
            </MenuItem>
            <MenuItem
              onClick={handleDifficultyChange}
              value="Hard"
              color={complexityColor["Hard"][colorMode]}
              fontWeight="bold"
            >
              Hard
            </MenuItem>
          </MenuList>
        </Menu>
        <Button
          colorScheme="purple"
          size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
          onClick={handleMatch}
        >
          Match
        </Button>
      </HStack>
    </Box>
  );
}
