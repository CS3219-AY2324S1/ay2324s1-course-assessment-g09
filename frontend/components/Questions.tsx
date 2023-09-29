import React from "react";
import Question from "./Question";
import questionStr from "../stores/questionsStore";
import { Box } from "@chakra-ui/react";
import QuestionsHeader from "./QuestionsHeader";

const Questions = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  return (
    <Box width="100%" marginX={12}>
      <QuestionsHeader />
      <Question
        inputValues={inputValues}
        setInputValues={setInputValues}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        colorMode={colorMode}
      />
    </Box>
  );
};

export default Questions;
