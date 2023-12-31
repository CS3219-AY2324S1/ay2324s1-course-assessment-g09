import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import socketManager from "../Sockets/CommunicationSocketManager";
import MatchsocketManager from "../Sockets/MatchSocketManager";
import { useRouter } from "next/router";
import collabSocketManager from "../Sockets/CollabSocketManager";


export default function MatchButton({ handleQuickStart, roomCreated }) {
  const { colorMode } = useColorMode();

  const [matchedRoom, setMatchedRoom] = useState("");

  const complexityColor = {
    Easy: "green",
    Medium: "orange",
    Hard: "red",
  };

  const complexityTextColor = {
    Easy: { light: "green.500", dark: "green.300" },
    Medium: { light: "orange.500", dark: "orange.300" },
    Hard: { light: "red.500", dark: "red.300" },
  };

  const [difficulty, setDifficulty] = useState("Easy");
  const router = useRouter();
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    console.log(difficulty);
  };
  const handleMatch = async () => {
    console.log("matching begins");
    handleQuickStart();
    try {
      const data = {
        condition: "",
        difficulty: difficulty,
        user: JSON.parse(sessionStorage.getItem("login")).id,
        // user: "test",
        videoSocket: socketManager.getSocketId(),
      };
    //   console.log(data);
      console.log("User", data.user, "\nStart matching for", data.difficulty, "difficulty\nVideo Socket:", data.videoSocket, "\nCondition:", data.condition)
      MatchsocketManager.emitEvent("match", data);
    } catch (error) {
      console.log(error);
    }
    MatchsocketManager.subscribeToEvent("matched", (data) => {
      const matchedUser = data.user;
      const matchedVideoSocket = data.videoSocket;
      const room = data.roomId;
      console.log("Matched with User", matchedUser,"\nMatched Video Socket:", matchedVideoSocket, "\nEntering Collab Room:", room);
      collabSocketManager.setRoom(room);
      collabSocketManager.setDifficulty(difficulty);
      socketManager.setMatchedSocketId(matchedVideoSocket);
      MatchsocketManager.setMatchedUser(matchedUser);
    //   console.log("Entering collab room:")
      MatchsocketManager.setMatchedRoom(room);
      router.push("/assignment5/successMatch");
      // Add Matched Feedback
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
            colorScheme={complexityColor[difficulty]}
            isDisabled={roomCreated}
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
        <Button
          colorScheme="purple"
          size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
          onClick={handleMatch}
          isDisabled={roomCreated}
        >
          Match
        </Button>
      </HStack>        
    </Box>
  );
}
