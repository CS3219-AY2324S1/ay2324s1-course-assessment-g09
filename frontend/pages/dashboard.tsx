import {
  Box,
  Center,
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
import UserComponent from "../components/UserComponent";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const dashboard = () => {
  const [questions, setQuestions] = useState(null);
  const [users, setUsers] = useState(null);
  // const [difficultyCount, setDifficultyCount] = useState({
  //   Easy: 0,
  //   Medium: 0,
  //   Hard: 0,
  // });
  const [easyCount, setEasyCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`question_service/questions`);
      console.log(res);
      setQuestions(res.data.qns);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const fetchUsers = async () => {
    try {
      // const res = await axios.get(`${IP_ADDRESS}:3002/users/getall`);
      const res = await axios.get(`user_service/users/getUser`);
      console.log(res);
      setUsers(res.data.users);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchUsers();
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

  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const handleCheckboxChange = (changedCategory: any) => {
    setSelectedCategory((previouslySelectedCategory) =>
      previouslySelectedCategory.includes(changedCategory)
        ? previouslySelectedCategory.filter((item) => item !== changedCategory)
        : [...previouslySelectedCategory, changedCategory]
    );
  };

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
            handleCheckboxChange={handleCheckboxChange}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
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
        <QuestionProgress colorMode={colorMode} questions={questions} />
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
        {user == "user" ? (
          <History />
        ) : (
          <UserComponent
            userInputValues={userInputValues}
            setUserInputValues={setUserInputValues}
            isCreateUser={isCreateUser}
            setIsCreateUser={setIsCreateUser}
            fetchUsers={fetchUsers}
            users={users}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default dashboard;
