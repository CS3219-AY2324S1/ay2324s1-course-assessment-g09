import React from "react";
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
}) => {
  return (
    <Box width="100%" height="100%">
      <QuestionsHeader userMode={userMode} />
      {/* <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}> */}
      <Question
        inputValues={inputValues}
        setInputValues={setInputValues}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        colorMode={colorMode}
        userMode={userMode}
      />
      {/* </div> */}
    </Box>
  );
};

export default Questions;
