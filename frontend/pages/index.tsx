import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import QuestionInputField from "../components/QuestionsInputField";
import Questions from "../components/Questions";

import ToggleMode from "../components/ToggleMode";
import QuestionsHeader from "../components/QuestionsHeader";
import UserInputField from "../components/UserInputField";
import UserHeader from "../components/UserHeader";
import Users from "../components/Users";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const IndexPage = () => {

  const router = useRouter();
  const { data: session, status } = useSession();
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
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return router.push('/api/auth/signin');
  }




  return (
    <Box height="100vh" display="flex" flexDirection="column">
       <ToggleMode
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        toggleDisplayDB={toggleDisplayDB}
        displayDB={displayDB}
      />
      <Link href="/collaboration"> collaboration </Link>
      <Flex ml="auto" pr={2} pt={2}>
        {colorMode === "light" ? (
          <Icon
            as={BsFillSunFill}
            color="orange"
            boxSize={8}
            onClick={toggleColorMode}
            marginX={2}
            marginTop={1}
          />
        ) : (
          <Icon
            as={BsFillMoonFill}
            color="yellow"
            boxSize={8}
            onClick={toggleColorMode}
            marginX={2}
            marginTop={1}
          />
        )}
      </Flex>
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
