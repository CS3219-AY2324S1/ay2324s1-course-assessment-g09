import { Box, Flex, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import Questions from "../components/Questions";
import QuestionInputField from "../components/QuestionsInputField";
import UserInputField from "../components/UserInputField";
import Users from "../components/Users";
import History from "../components/History";
import Profile from "./profile";
import QuestionProgress from "./questionProgress";

const dashboard = () => {
  // Questions input field
  const [questionInputValues, setQuestionInputValues] = useState({
    edit_id: "",
    qn_num: "",
    title: "",
    description: "",
    category: "",
    complexity: "",
  });

  // useState for Creating Question (Whether it's Create/Update question)
  const [isCreateQuestion, setIsCreateQuestion] = useState(true);

  // useState for Creating User (Whether it's Create/Update user)
  const [isCreateUser, setIsCreateUser] = useState(true);

  // To check if it's light/dark mode
  const { colorMode } = useColorMode();

  // User Input Field
  const [userInputValues, setUserInputValues] = useState({
    user_id: "",
    name: "",
  });

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(5, 1fr)"
      gap={8}
      height="inherit"
    >
      {/* GridItem that contains Profile */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.600"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        rowSpan={2}
        boxShadow="xl"
      >
        <Profile colorMode={colorMode} />
      </GridItem>

      {/* Question Storage Entry */}
      <GridItem
        colSpan={3}
        rowSpan={3}
        bgColor={colorMode == "light" ? "gray.300" : "gray.600"}
        borderRadius="xl"
        boxShadow="xl"
      >
        <Flex
          width="100%"
          alignItems="center"
          justify="center"
          flexDirection="column"
          p={5}
        >
          <QuestionInputField
            inputValues={questionInputValues}
            setInputValues={setQuestionInputValues}
            isCreate={isCreateQuestion}
            setIsCreate={setIsCreateQuestion}
            colorMode={colorMode}
          />
          <Questions
            inputValues={questionInputValues}
            setInputValues={setQuestionInputValues}
            isCreate={isCreateQuestion}
            setIsCreate={setIsCreateQuestion}
            colorMode={colorMode}
          />
        </Flex>
      </GridItem>

      {/* History Portion */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.600"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="xl"
        rowSpan={3}
      >
        <History />
      </GridItem>

      {/* Circular Progress to show how many question is completed */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.600"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="xl"
      >
        <QuestionProgress colorMode={colorMode} />
      </GridItem>

      {/* Placeholder */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.600"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="xl"
        colStart={2}
      >
        <Box>Placeholder 1</Box>
      </GridItem>

      {/* User Entry Table */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.600"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="xl"
        colStart={3}
        rowStart={4}
        colSpan={2}
        rowSpan={2}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="90%"
        >
          <UserInputField
            userInputValues={userInputValues}
            setUserInputValues={setUserInputValues}
            colorMode={colorMode}
            isCreate={isCreateUser}
            setIsCreate={setIsCreateUser}
          />

          <Users
            userInputValues={userInputValues}
            setUserInputValues={setUserInputValues}
            isCreate={isCreateUser}
            setIsCreate={setIsCreateUser}
            colorMode={colorMode}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default dashboard;
