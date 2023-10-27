import {
  Box,
  Flex,
  Grid,
  GridItem,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Questions from "../components/Questions";
import QuestionInputField from "../components/QuestionsInputField";
import UserInputField from "../components/UserInputField";
import Users from "../components/Users";
import History from "../components/History";
import Profile from "./profile";
import QuestionProgress from "./questionProgress";
import axios from "axios";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const dashboard = () => {
  const [questions, setQuestions] = useState(null);
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${IP_ADDRESS}:3001/questions/getall`);

      setQuestions(res.data.qns);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

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

  const [user, setUserRole] = useState("user");

  useEffect(() => {
    const login = JSON.parse(window.sessionStorage.getItem("login"));

    if (login && login.isLoggedIn) {
      setUserRole(login.role);
    }

  }, []);

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(5, 1fr)"
      gap={8}
      height="inherit"
    >
      {/* GridItem that contains Profile */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.700"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        rowSpan={2}
        boxShadow="xl"
        width="100%"
        height="100%"
      >
        <Profile colorMode={colorMode} userMode={user} />
      </GridItem>

      {/* Question Storage Entry */}
      <GridItem
        colSpan={3}
        rowSpan={3}
        bgColor={colorMode == "light" ? "gray.300" : "gray.700"}
        borderRadius="xl"
        boxShadow="xl"
        height="100%"
        width="100%"
      >
        <VStack m={5} height="100%">
          {user == "user" ? (
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
          ) : (
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
          )}
        </VStack>
      </GridItem>

      {/* User Portion */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.700"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        boxShadow="xl"
        rowSpan={3}
        width="100%"
        height="100%"
      >
        <Flex
          marginTop={5}
          alignItems="center"
          justifyContent="flex-start"
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

      {/* Circular Progress to show how many question is completed */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.700"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="xl"
        height="100%"
        width="100%"
      >
        <QuestionProgress colorMode={colorMode} />
      </GridItem>

      {/* Placeholder */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.700"}
        borderRadius="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="xl"
        colStart={2}
        height="100%"
        width="100%"
      >
        <Box>Placeholder 1</Box>
      </GridItem>

      {/* User Entry Table */}
      <GridItem
        bgColor={colorMode == "light" ? "gray.300" : "gray.700"}
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
        <History />
      </GridItem>
    </Grid>
  );
};

export default dashboard;
