import {
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import React from "react";

const questionProgress = ({ colorMode }) => {
  return (
    <HStack>
      <CircularProgress
        value={65}
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
        value={35}
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
        value={20}
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
