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
  fetchQuestions,
  questions
}) => {
  return (
    <Box width="100%" marginX={12} h="full">
      <QuestionsHeader />
      {/* <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}> */}
      <Question
        inputValues={inputValues}
        setInputValues={setInputValues}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        colorMode={colorMode} fetchQuestions={fetchQuestions} questions={questions}      />
      {/* </div> */}
    </Box>
  );
};

export default Questions;
