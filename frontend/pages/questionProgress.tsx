import {
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const questionProgress = ({ colorMode, questions }) => {
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
        const easyCount = questions.filter((q) => q.complexity === "Easy").length;
        const mediumCount = questions.filter(
          (q) => q.complexity === "Medium"
        ).length;
        const hardCount = questions.filter((q) => q.complexity === "Hard").length;
        console.log("fetched from history", res.data);
        setProgress({
          Easy: res.data.Easy * 100 / easyCount,
          Medium: res.data.Medium * 100 / mediumCount,
          Hard: res.data.Hard * 100 / hardCount,
        });
        console.log("fetch from question", easyCount, mediumCount, hardCount, progress.Easy, progress.Medium, progress.Hard)
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
    fetchProgress();
  }, [questions])

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
