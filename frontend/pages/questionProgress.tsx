import {
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const questionProgress = ({ colorMode, difficultyCount }) => {
  const [progress, setProgress] = useState({
    Easy: 0,
    Medium: 0,
    Hard: 0,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const authUser = JSON.parse(sessionStorage.getItem("login")).email;
        const res = await axios.get(
          `/history_service/getProgress/${authUser}`
        );
        console.log(res.data);
        setProgress({
          Easy: res.data.Easy * 100 / difficultyCount.Easy,
          Medium: res.data.Medium * 100 / difficultyCount.Medium,
          Hard: res.data.Hard * 100 / difficultyCount.Hard,
        });
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
    fetchProgress();
  })

  return (
    <HStack>
      <CircularProgress
        value={progress.Easy}
        size="85px"
        thickness="10px"
        my={2}
        mx={4}
        color={colorMode == "light" ? "green.500" : "green.300"}
      >
        <CircularProgressLabel
          fontSize="sm"
          color={colorMode == "light" ? "green.500" : "green.300"}
          fontWeight="bold"
        >
          Easy
        </CircularProgressLabel>
      </CircularProgress>
      <CircularProgress
        value={progress.Medium}
        size="85px"
        thickness="10px"
        my={2}
        mx={4}
        color={colorMode == "light" ? "orange.500" : "orange.300"}
      >
        <CircularProgressLabel
          fontSize="sm"
          color={colorMode == "light" ? "orange.500" : "orange.300"}
          fontWeight="bold"
        >
          Medium
        </CircularProgressLabel>
      </CircularProgress>
      <CircularProgress
        value={progress.Hard}
        size="85px"
        thickness="10px"
        my={2}
        mx={4}
        color={colorMode == "light" ? "red.500" : "red.400"}
      >
        <CircularProgressLabel
          fontSize="sm"
          color={colorMode == "light" ? "red.500" : "red.400"}
          fontWeight="bold"
        >
          Hard
        </CircularProgressLabel>
      </CircularProgress>
    </HStack>
  );
};

export default questionProgress;
