import React, { useState } from "react";
import Question from "./Question";
import questionStr from "../stores/questionsStore";
import { Box, Flex } from "@chakra-ui/react";
import QuestionsHeader from "./QuestionsHeader";

const Questions = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
  userMode,
  questions,
  fetchQuestions,
}) => {
  const [complexity, setComplexity] = useState("");

  return (
    <Box width="100%" height="100%">
      <QuestionsHeader
        userMode={userMode}
        complexity={complexity}
        setComplexity={setComplexity}
      />
      {/* <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}> */}
      <Question
        inputValues={inputValues}
        setInputValues={setInputValues}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        colorMode={colorMode}
        userMode={userMode}
        questions={questions}
        fetchQuestions={fetchQuestions}
        selectedComplexity={complexity}
      />
      {/* </div> */}
    </Box>
  );
};

export default Questions;
