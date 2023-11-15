import { Box, Center, Flex, VStack, useColorMode } from "@chakra-ui/react";
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
  handleCheckboxChange,
  setSelectedCategory,
  selectedCategory,
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
          handleCheckboxChange={handleCheckboxChange}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </Box>

      <Box width="100%" height="90%" mt={8}>
        {questions != null &&
        Array.isArray(questions) &&
        questions.length != 0 ? (
          <Questions
            inputValues={questionInputValues}
            setInputValues={setQuestionInputValues}
            isCreate={isCreateQuestion}
            setIsCreate={setIsCreateQuestion}
            colorMode={colorMode}
            userMode={user}
            questions={questions}
            fetchQuestions={fetchQuestions}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        ) : (
          <Center height="100%" width="100%">
            Questions is currently empty...
          </Center>
        )}
      </Box>
    </Flex>
  );
};

export default QuestionsComponent;
