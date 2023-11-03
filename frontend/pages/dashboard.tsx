import {
  Box,
  Flex,
  Grid,
  GridItem,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import History from "../components/History";
import Questions from "../components/Questions";
import QuestionsComponent from "../components/QuestionsComponent";
import UserInputField from "../components/UserInputField";
import Users from "../components/Users";
import Profile from "./profile";
import QuestionProgress from "./questionProgress";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const dashboard = () => {
  const [questions, setQuestions] = useState(null);
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`question_service/questions`);
      console.log(res);

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

  const [userEmail, setUserEmail] = useState("");
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

  const [user, setUserRole] = useState("admin");

  useEffect(() => {
    const login = JSON.parse(window.sessionStorage.getItem("login"));

    if (login && login.isLoggedIn) {
      console.log(login);
      setUserRole(login.role);
      setUserEmail(login.email);
      console.log("EMAIL SET");
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
        boxShadow="xl"
        width="100%"
        height="100%"
        rowSpan={1}
      >
        <Profile colorMode={colorMode} userMode={user} userEmail={userEmail} />
      </GridItem>

      {/* Question Storage Entry */}
      <GridItem
        colSpan={3}
        rowSpan={5}
        bgColor={colorMode == "light" ? "gray.300" : "gray.700"}
        borderRadius="xl"
        boxShadow="xl"
        height="100%"
        width="100%"
      >
        {user == "user" ? (
          <Box height="100%" width="100%" p={2}>
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
        ) : (
          <QuestionsComponent
            questionInputValues={questionInputValues}
            setQuestionInputValues={setQuestionInputValues}
            isCreateQuestion={isCreateQuestion}
            setIsCreateQuestion={setIsCreateQuestion}
            setQuestions={setQuestions}
            user={user}
            questions={questions}
            fetchQuestions={fetchQuestions}
          />
        )}
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
        rowSpan={1}
      >
        <QuestionProgress colorMode={colorMode} />
      </GridItem>

      {/* User Portion/ History */}
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
          <History />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default dashboard;
