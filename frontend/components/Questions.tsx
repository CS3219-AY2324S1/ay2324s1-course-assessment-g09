import React from "react";
import Question from "./Question";
import questionStr from "../stores/questionsStore";
import { Box } from "@chakra-ui/react";

const Questions = () => {
  return (
    <Box width="100%" marginX={12}>
      <Question />
    </Box>
  );
};

export default Questions;
