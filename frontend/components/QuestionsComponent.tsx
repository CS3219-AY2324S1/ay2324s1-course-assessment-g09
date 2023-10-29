import { Box, Flex, VStack, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import QuestionInputField from "./QuestionsInputField";
import Questions from "./Questions";

const QuestionsComponent = ({
  questionInputValues,
  setQuestionInputValues,
  isCreateQuestion,
  setIsCreateQuestion,
  setQuestions,
  user,
  questions,
  fetchQuestions,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Flex height="100%" width="100%" flexDirection="column" p={2}>
      <Box width="100%" height="10%">
        <QuestionInputField
          inputValues={questionInputValues}
          setInputValues={setQuestionInputValues}
          isCreate={isCreateQuestion}
          setIsCreate={setIsCreateQuestion}
          colorMode={colorMode}
          setQuestions={setQuestions}
        />
      </Box>

      <Box width="100%" height="90%" mt={8}>
        <Questions
          inputValues={questionInputValues}
          setInputValues={setQuestionInputValues}
          isCreate={isCreateQuestion}
          setIsCreate={setIsCreateQuestion}
          colorMode={colorMode}
          userMode={user}
          questions={questions}
          fetchQuestions={fetchQuestions}
        />
      </Box>
    </Flex>
  );
};

export default QuestionsComponent;
