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
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <Box height="fit-content" width="100%">
        <QuestionsHeader
          userMode={userMode}
          complexity={complexity}
          setComplexity={setComplexity}
        />
      </Box>

      <Box height="85%" width="100%">
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
      </Box>

      {/* </div> */}
    </Box>
  );
};

export default Questions;
