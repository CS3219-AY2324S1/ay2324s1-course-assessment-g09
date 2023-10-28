import { useColorMode } from "@chakra-ui/react";
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
    <>
      <QuestionInputField
        inputValues={questionInputValues}
        setInputValues={setQuestionInputValues}
        isCreate={isCreateQuestion}
        setIsCreate={setIsCreateQuestion}
        colorMode={colorMode}
        setQuestions={setQuestions}
      />
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
    </>
  );
};

export default QuestionsComponent;
