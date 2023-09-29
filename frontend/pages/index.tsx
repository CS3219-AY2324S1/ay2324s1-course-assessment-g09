import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import QuestionInputField from "../components/QuestionsInputField";
import Questions from "../components/Questions";
import ToggleMode from "../components/ToggleMode";
import QuestionsHeader from "../components/QuestionsHeader";
import UserInputField from "../components/UserInputField";
import UserHeader from "../components/UserHeader";
import Users from "../components/Users";

const IndexPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [questionInputValues, setQuestionInputValues] = useState({
    edit_id: "",
    question_id: "",
    title: "",
    description: "",
    category: "",
    complexity: "",
  });

  const [userInputValues, setUserInputValues] = useState({
    user_id: "",
    name: "",
  });

  const [isCreate, setIsCreate] = useState(true);
  const [displayDB, setDisplayDB] = useState("questions");

  const toggleDisplayDB = () => {
    displayDB == "questions"
      ? setDisplayDB("users")
      : setDisplayDB("questions");
  };
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <ToggleMode
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        toggleDisplayDB={toggleDisplayDB}
        displayDB={displayDB}
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Flex
            flexDirection="column"
            align="center"
            background={colorMode == "light" ? "gray.300" : "gray.700"}
            p={6}
            borderRadius="xl"
            height="80%"
            marginX={16}
          >
            {displayDB == "questions" ? (
              <>
                <QuestionInputField
                  inputValues={questionInputValues}
                  setInputValues={setQuestionInputValues}
                  isCreate={isCreate}
                  setIsCreate={setIsCreate}
                  colorMode={colorMode}
                />
                <Flex width="100%" alignItems="center" justify="center">
                  <Questions
                    inputValues={questionInputValues}
                    setInputValues={setQuestionInputValues}
                    isCreate={isCreate}
                    setIsCreate={setIsCreate}
                    colorMode={colorMode}
                  />
                </Flex>
              </>
            ) : (
              <>
                <UserInputField
                  userInputValues={userInputValues}
                  setUserInputValues={setUserInputValues}
                  colorMode={colorMode}
                  isCreate={isCreate}
                  setIsCreate={setIsCreate}
                />
                <Flex width="100%" alignItems="center" justify="center">
                  <Users
                    userInputValues={userInputValues}
                    setUserInputValues={setUserInputValues}
                    isCreate={isCreate}
                    setIsCreate={setIsCreate}
                    colorMode={colorMode}
                  />
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default IndexPage;
