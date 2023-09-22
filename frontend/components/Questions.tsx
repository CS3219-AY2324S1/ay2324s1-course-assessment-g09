import React from "react";
import Question from "./Question";
import questionStr from "../stores/questionsStore";
import { Box } from "@chakra-ui/react";

const Questions = ({ inputValues, setInputValues, isCreate, setIsCreate }) => {
  return (
    <Box width="100%" marginX={12}>
      <Question
        inputValues={inputValues}
        setInputValues={setInputValues}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
      />
    </Box>
  );
};

export default Questions;
